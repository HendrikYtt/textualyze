// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

// Note: When using the Node.JS APIs, the config file doesn't apply. Instead, pass options directly to the APIs

import {Config} from '@remotion/cli/config';

// Config.setVideoImageFormat("png");
// Config.setPixelFormat("yuva420p");
// Config.setCodec("vp8");
Config.setOverwriteOutput(true);
