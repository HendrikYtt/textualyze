import {RequestPayload} from '@hendrikytt/api-contracts';

type Difference = {
	field: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	oldValue: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	newValue: any;
}

export type DifferenceType =
	'NORMAL'
	| 'INITIAL'
	| 'MAX_WORD_PER_SEGMENT'
	| 'NEW_WORD_INTO_SEGMENT'
	| 'NEW_SEGMENT'
	| 'REMOVE_WORD_FROM_SEGMENT'
	| 'REMOVE_SEGMENT'
	| 'MOVE_WORD_TO_NEXT_SEGMENT'
	| 'MOVE_WORD_TO_PREV_SEGMENT'
	| 'SELECT_NEW_TEMPLATE';

export const specificCommands: DifferenceType[] = [
	'NEW_WORD_INTO_SEGMENT',
	'REMOVE_WORD_FROM_SEGMENT',
	'NEW_SEGMENT',
	'REMOVE_SEGMENT',
	'MOVE_WORD_TO_PREV_SEGMENT',
	'MOVE_WORD_TO_NEXT_SEGMENT'
];

export type StateDifference = {
	differenceType: DifferenceType;
	differences: Difference[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	customValues?: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDifferences = (prevState: any, currentState: any, prevWordsPerSegment: number | undefined, currentWordsPerSegment: number, prefix: string = ''): StateDifference => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const differences: Difference[] = [];

	if (prevState.duration === 0 && prevState.size === 0) {
		return {
			differenceType: 'INITIAL',
			differences: []
		};
	}

	if (prevWordsPerSegment !== currentWordsPerSegment) {
		return {
			differenceType: 'MAX_WORD_PER_SEGMENT',
			differences: [
				{
					field: 'maxWordsPerSegment',
					oldValue: prevWordsPerSegment,
					newValue: currentWordsPerSegment
				}
			]
		};
	}

	for (const key in currentState) {
		const fullPath = prefix ? `${prefix}.${key}` : key;
		const prevValue = prevState[key];
		const currValue = currentState[key];

		if (Array.isArray(currValue)) {
			if (!Array.isArray(prevValue)) {
				differences.push({
					field: fullPath,
					oldValue: prevValue,
					newValue: currValue,
				});
			} else {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				currValue.forEach((item: any, index: number) => {
					differences.push(
						...getDifferences(
							prevValue[index] || {},
							item,
							prevWordsPerSegment,
							currentWordsPerSegment,
							`${fullPath}[${index}]`
						).differences
					);
				});
			}
		} else if (currValue && typeof currValue === 'object' && !Array.isArray(currValue)) {
			if (prevValue && typeof prevValue === 'object' && !Array.isArray(prevValue)) {
				differences.push(
					...getDifferences(
						prevValue,
						currValue,
						prevWordsPerSegment,
						currentWordsPerSegment,
						fullPath
					).differences
				);
			} else {
				differences.push({
					field: fullPath,
					oldValue: prevValue,
					newValue: currValue,
				});
			}
		} else if (currValue !== prevValue) {
			differences.push({
				field: fullPath,
				oldValue: prevValue,
				newValue: currValue,
			});
		}
	}

	return {
		differenceType: 'NORMAL',
		differences: differences
	};
};


export const revertDifference = (stateDifference: StateDifference): StateDifference => {
	return {
		differenceType: stateDifference.differenceType,
		differences: stateDifference.differences.map(d => {
			return {
				field: d.field,
				newValue: d.oldValue,
				oldValue: d.newValue
			};
		})
	};
};

export const constructPreviousRequestPayload = (requestPayloadCopy: RequestPayload, stateDifference: StateDifference) => {
	return constructRequestPayload(requestPayloadCopy, stateDifference, 'prev');
};

export const constructNextRequestPayload = (requestPayloadCopy: RequestPayload, stateDifference: StateDifference) => {
	return constructRequestPayload(requestPayloadCopy, stateDifference, 'next');
};

export const constructRequestPayload = (requestPayloadCopy: RequestPayload, stateDifference: StateDifference, type: 'next' | 'prev') => {
	stateDifference.differences.forEach(d => {
		const fieldsAndIndices = d.field.split(/[.[\]]+/).filter(Boolean);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let target = requestPayloadCopy as any;

		// Drill down into final field
		for (let i = 0; i < fieldsAndIndices.length - 1; i++) {
			const isKeyAttribute = isNaN(Number(fieldsAndIndices[i]));
			const key = isKeyAttribute
				? fieldsAndIndices[i]
				: Number(fieldsAndIndices[i]);
			target = target[key];
		}

		const isLastKeyAttribute = isNaN(Number(fieldsAndIndices[fieldsAndIndices.length - 1]));
		const finalKey = isLastKeyAttribute
			? fieldsAndIndices[fieldsAndIndices.length - 1]
			: Number(fieldsAndIndices[fieldsAndIndices.length - 1]);
		target[finalKey] = type === 'next' ? d.newValue : d.oldValue;
	});

	return requestPayloadCopy;
};
