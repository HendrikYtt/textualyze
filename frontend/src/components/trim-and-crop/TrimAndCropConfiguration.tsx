import React, {useEffect, useState} from 'react';
import {Grid, Typography} from '@mui/material';
import {TrimAndCropTime} from './TrimAndCropTime';
import {useTranscriptionContext} from '../../contexts/TranscriptionContext';
import {durationInSecondsToStringTimes, stringTimesToDurationInSeconds} from '../../utils/trim-and-crop';
import {useTrimAndCropContext} from '../../contexts/TrimAndCropContext';
import {TrimAndCropTimeline} from './TrimAndCropTimeline';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {isSmallerThanMd} from '../../hooks/is-compact';

export type SelectedAspectRatio = 'Original' | '16:9' | '9:16' | '1:1' | '4:5';

export const TrimAndCropConfiguration = () => {
	const smallerThanMd = isSmallerThanMd();

	const {
		originalFileData
	} = useTranscriptionContext();

	const {
		trimmedEndMinutes,
		setTrimmedEndMinutes,
		trimmedEndSeconds,
		setTrimmedEndSeconds,
		trimmedEndHundredths,
		setTrimmedEndHundredths,
		trimmedStartMinutes,
		setTrimmedStartMinutes,
		trimmedStartSeconds,
		setTrimmedStartSeconds,
		trimmedStartHundredths,
		setTrimmedStartHundredths,
		setIsTrimAndCropPlayerPlaying,
		trimAndCropPlayerRef
	} = useTrimAndCropContext();

	const [maxEndTimeMinutes, setMaxEndTimeMinutes] = useState(0);
	const [maxEndTimeSecs, setMaxEndTimeSecs] = useState(0);
	const [maxEndTimeHundredths, setMaxEndTimeHundredths] = useState(0);

	const [maxStartTimeMinutes, setMaxStartTimeMinutes] = useState(0);
	const [maxStartTimeSecs, setMaxStartTimeSecs] = useState(0);
	const [maxStartTimeHundredths, setMaxStartTimeHundredths] = useState(0);

	const handleTimeChange = (value: string, setter: React.Dispatch<React.SetStateAction<string>>, max: number) => {
		const currentValue = Number(value);
		const num = Math.max(0, Math.min(max, currentValue));
		const val = num.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
		setter(val);
		return val;
	};

	const pausePlayer = () => {
		if (trimAndCropPlayerRef.current) {
			trimAndCropPlayerRef.current.pause();
			setIsTrimAndCropPlayerPlaying(false);
		}
	};

	useEffect(() => {
		const maxEndStringTimes = durationInSecondsToStringTimes(originalFileData.duration);
		setMaxEndTimeMinutes(Number(maxEndStringTimes.minutes));
		setMaxEndTimeSecs(Number(trimmedEndMinutes) === maxEndTimeMinutes ? Number(maxEndStringTimes.seconds) : 59);
		setMaxEndTimeHundredths(Number(trimmedEndSeconds) === maxEndTimeSecs ? Number(maxEndStringTimes.hundredths) : 99);
		const maxEndTimeDurationInSeconds = stringTimesToDurationInSeconds(maxEndStringTimes.minutes, maxEndStringTimes.seconds, maxEndStringTimes.hundredths);

		const startTime = maxEndTimeDurationInSeconds - 1;
		const maxStartTimeDurationInSeconds = startTime < 0 ? 0 : startTime;
		const maxStartStringTimes = durationInSecondsToStringTimes(maxStartTimeDurationInSeconds);
		setMaxStartTimeMinutes(Number(maxStartStringTimes.minutes));
		setMaxStartTimeSecs(Number(trimmedStartMinutes) === maxStartTimeMinutes ? Number(maxStartStringTimes.seconds) : 59);
		setMaxStartTimeHundredths(Number(trimmedStartSeconds) === maxStartTimeSecs ? Number(maxStartStringTimes.hundredths) : 99);
	}, [originalFileData.duration, maxEndTimeMinutes, maxEndTimeSecs, maxEndTimeHundredths, maxStartTimeMinutes, maxStartTimeSecs, maxStartTimeHundredths, trimmedEndMinutes, trimmedStartMinutes, trimmedStartSeconds]);

	return (
		<>
			<div style={{height: '100%'}}>
				<Grid container mb={1} mt={4}>
					<TrimAndCropTimeline/>
				</Grid>
				<div
					style={{
						display: 'flex',
						alignItems: 'start',
						justifyContent: 'space-between'
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'start'
						}}
					>
						{!smallerThanMd && (
							<Typography
								sx={{
									width: '105%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									marginTop: '8px'
								}}
								noWrap
							>
								Start
							</Typography>
						)}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								height: '100%',
								width: '100%',
								paddingLeft: '8px',
								borderTopLeftRadius: '10px',
								borderBottomLeftRadius: '10px',
								marginTop: '-4px',
								columnGap: '3px'
							}}
						>
							<TrimAndCropTime
								value={trimmedStartMinutes}
								onBlur={(e) => handleTimeChange(e.target.value, setTrimmedStartMinutes, maxStartTimeMinutes)}
								border="left"
							/>
							<TrimAndCropTime
								value={trimmedStartSeconds}
								onBlur={(e) => handleTimeChange(e.target.value, setTrimmedStartSeconds, maxStartTimeSecs)}
								border="none"
							/>
							<TrimAndCropTime
								value={trimmedStartHundredths}
								onBlur={(e) => handleTimeChange(e.target.value, setTrimmedStartHundredths, maxStartTimeHundredths)}
								border="right"
							/>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'space-around',
									height: '50px',
									width: '20px',
									padding: '0',
									gap: '0',
									marginBottom: '8px',
									marginLeft: '-4px'
								}}
							>
								<ArrowDropUpIcon
									onClick={() => {
										setTrimmedStartSeconds(prevState => {
											pausePlayer();
											const asNum = Number(prevState);
											if (asNum + 2 === parseInt(trimmedEndSeconds)) {
												return prevState;
											}
											const incremented = asNum + 1;
											return incremented.toString().padStart(2, '0');
										});
									}}
									sx={{
										mb: '-12px',
										'&:hover': {
											cursor: 'pointer'
										},
									}}
								/>
								<ArrowDropDownIcon
									onClick={() => {
										setTrimmedStartSeconds(prevState => {
											pausePlayer();
											const asNum = Number(prevState);
											if (asNum === 0) {
												return prevState;
											}
											const decremented = asNum - 1;
											return decremented.toString().padStart(2, '0');
										});
									}}
									sx={{
										mt: '-12px',
										'&:hover': {
											cursor: 'pointer'
										},
									}}
								/>
							</div>
						</div>
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'start'
						}}
					>
						{!smallerThanMd && (
							<Typography
								sx={{
									width: '100%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									marginLeft: '8px',
									marginTop: '8px'
								}}
							>
								End
							</Typography>
						)}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								height: '100%',
								width: '100%',
								paddingLeft: '4px',
								paddingRight: '0px',
								borderTopRightRadius: '10px',
								borderBottomRightRadius: '10px',
								marginTop: '-4px',
								columnGap: '3px'
							}}
						>
							<TrimAndCropTime
								value={trimmedEndMinutes}
								onBlur={(e) => handleTimeChange(e.target.value, setTrimmedEndMinutes, maxEndTimeMinutes)}
								border="left"
							/>
							<TrimAndCropTime
								value={trimmedEndSeconds}
								onBlur={(e) => handleTimeChange(e.target.value, setTrimmedEndSeconds, maxEndTimeSecs)}
								border="none"
							/>
							<TrimAndCropTime
								value={trimmedEndHundredths}
								onBlur={(e) => handleTimeChange(e.target.value, setTrimmedEndHundredths, maxEndTimeHundredths)}
								border="right"
							/>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'space-around',
									height: '50px',
									width: '20px',
									padding: '0',
									gap: '0',
									marginBottom: '8px',
									marginLeft: '-4px'
								}}
							>
								<ArrowDropUpIcon
									onClick={() => {
										setTrimmedEndSeconds(prevState => {
											pausePlayer();
											const asNum = Number(prevState);
											const originalFileDurationIntegerPart = Number(originalFileData.duration.toString().split('.')[0]);
											if (asNum === originalFileDurationIntegerPart) {
												return prevState;
											}
											const incremented = asNum + 1;
											return incremented.toString().padStart(2, '0');
										});
									}}
									sx={{
										mb: '-12px',
										'&:hover': {
											cursor: 'pointer'
										},
									}}
								/>
								<ArrowDropDownIcon
									onClick={() => {
										setTrimmedEndSeconds(prevState => {
											pausePlayer();
											const asNum = Number(prevState);
											if (asNum === parseInt(trimmedStartSeconds) + 2) {
												return prevState;
											}
											const decremented = asNum - 1;
											return decremented.toString().padStart(2, '0');
										});
									}}
									sx={{
										mt: '-12px',
										'&:hover': {
											cursor: 'pointer'
										},
									}}
								/>

							</div>
						</div>
					</div>
				</div>

			</div>
		</>
	);
};