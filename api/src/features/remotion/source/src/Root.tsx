import {Composition} from 'remotion';
import {myCompSchema, VideoWrapper} from "./VideoWrapper";
import requestPayload from './requestPayload.json';
import {fpsConst} from "@hendrikytt/api-contracts/dist/remotion";

export const RemotionRoot: React.FC = () => {

	return (
		<>
			{requestPayload && (
				<Composition
					id="VideoWrapper"
					component={VideoWrapper}
					durationInFrames={Math.ceil(requestPayload.duration * fpsConst)}
					fps={fpsConst}
					width={requestPayload.adjustedWidth || 1920}
					height={requestPayload.adjustedHeight || 1080}
					schema={myCompSchema}
					defaultProps={{
						requestPayload: JSON.stringify(requestPayload)
					}}
				/>
			)}
		</>
	);
};
