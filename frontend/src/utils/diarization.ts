import {DiarizationContent, Segment} from '@hendrikytt/api-contracts';

export const addDiarization = (displayedTranscription: Segment[], diarizationContent: DiarizationContent[]) => {
	const assignedSpeakers = new Set<string>();

	const continuous = makeDiarizationContinuous(diarizationContent);
	const result = {
		assignedSpeakers: [] as string[],
		displayedTranscription: displayedTranscription.map(segment => {
			const updatedWords = segment.words.map(word => {
				const speakerSegment = continuous.find(
					ds => (word.start < ds.end && word.end > ds.start)
				);

				if (speakerSegment) {
					assignedSpeakers.add(speakerSegment.speaker);
					return {
						...word,
						speaker: speakerSegment.speaker
					};
				}
				return word;
			});

			return {
				...segment,
				words: updatedWords
			};
		})
	};

	result.assignedSpeakers = Array.from(assignedSpeakers);
	return result;
};

export const makeDiarizationContinuous = (diarizationContent: DiarizationContent[]): DiarizationContent[] => {
	if (diarizationContent.length === 0) return [];

	const copy: DiarizationContent[] = JSON.parse(JSON.stringify(diarizationContent));
	const sortedContent = copy.sort((a, b) => a.start - b.start);
	const result: DiarizationContent[] = [sortedContent[0]];

	for (let i = 1; i < sortedContent.length; i++) {
		const current = sortedContent[i];
		const previous = result[result.length - 1];

		if (current.speaker === previous.speaker && current.start <= previous.end) {
			// Merge overlapping segments with the same speaker
			previous.end = Math.max(previous.end, current.end);
		} else if (current.start < previous.end) {
			// Handle overlapping segments with different speakers
			if (current.end > previous.end) {
				const overlapMidpoint = (current.start + previous.end) / 2;

				// Adjust the end time of the previous segment
				previous.end = overlapMidpoint;

				// Adjust the start time of the current segment and add it
				result.push({
					...current,
					start: overlapMidpoint
				});
			}
			// If current.end <= previous.end, we ignore this segment as it's contained within the previous one
		} else {
			// No overlap, add as a new segment
			result.push(current);
		}
	}

	return result;
};