// This is your entry file! Refer to it when you render:
// npx remotion render <entry-file> HelloWorld3 out/video.mp4

import {registerRoot} from 'remotion';
import {RemotionRoot} from './Root';
import './index.css';

registerRoot(RemotionRoot);
