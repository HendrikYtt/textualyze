import {createTheme, darken, lighten,} from '@mui/material/styles';

export const colors = {
	background: '#0A0D59',
	paper: {
		primary: '#FFFFFF',
		secondary: '#F3F3F3'
	},
	palette: {
		primary: '#F64C71',
		secondary: '#1A1F96',
	},
	font: {
		primary: '#eeebeb',
		secondary: '#03041D',
	},
	grey: '#757575',
	darkGrey: '#5E5D63',
	inputBgGrey: '#F8F8FC',
	inputBorderGrey: '#8E8EAF',
	iconGrey: '#757575',
	yellow: '#FFCF46',
	lightBlue: '#C8D8F8',
	green: '#98D9C6',
	gold: '#FFDC77'
};

const mode = 'dark' as const;

export const theme = createTheme({
	palette: {
		mode,
		primary: {
			light: lighten(colors.palette.primary, 0.1),
			main: colors.palette.primary,
			dark: darken(colors.palette.primary, 0.1),
		},
		secondary: {
			light: lighten(colors.palette.secondary, 0.1),
			main: colors.palette.secondary,
			dark: darken(colors.palette.secondary, 0.1),
			contrastText: colors.grey
		},
		background: {
			default: colors.background,
			paper: colors.paper.primary,
		},
		text: {
			primary: colors.font.primary,
			secondary: colors.font.secondary,
		},
	},
	typography: {
		fontFamily: 'Plus Jakarta Sans, sans-serif',
		button: {
			textTransform: 'none',
		},
	},
	shape: {
		borderRadius: 8,
	},

	components: {
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: colors.background,
					color: colors.font.primary,
				},
			},
		},
		MuiToolbar: {
			styleOverrides: {
				root: {
					paddingX: '0px'
				}
			}
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					color: colors.font.secondary,
				},
			},
		},
		MuiDialogTitle: {
			styleOverrides: {
				root: {
					color: colors.font.secondary,
				},
			},
		},
		MuiDialogActions: {
			styleOverrides: {
				root: {
					color: colors.font.secondary,
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: '50px'
				},
				contained: {
					color: colors.font.primary,
					backgroundColor: colors.palette.primary,
					'&:hover': {
						backgroundColor: colors.palette.primary,
						boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)',
					},
					'&:disabled': {
						color: 'rgba(0, 0, 0, 0.26)',
						backgroundColor: 'rgba(0, 0, 0, 0.12)',
						boxShadow: 'none'
					}
				},
				outlined: {
					borderColor: 'rgba(0, 0, 0, 0.15)'
				},
				containedSecondary: {
					color: colors.font.secondary,
					backgroundColor: colors.palette.secondary,
					'&:hover': {
						backgroundColor: colors.palette.secondary,
						boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)',
						opacity: 0.8
					},
					'&:disabled': {
						color: 'rgba(0, 0, 0, 0.26)',
						backgroundColor: 'rgba(0, 0, 0, 0.12)',
						boxShadow: 'none'
					}
				}
			}
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					display: 'flex',
					alignItems: 'center',
					height: '56px',
				},
			},
		},
		// Target the Input component part of the TextField for specific customizations
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					color: 'black',
					backgroundColor: colors.inputBgGrey,
					'&:hover .MuiOutlinedInput-notchedOutline': {
						borderColor: colors.inputBorderGrey
					},
					'&.Mui-error .MuiOutlinedInput-notchedOutline': {
						borderColor: 'red',
					},
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderColor: colors.palette.secondary, // Default focus color
					},
					'& input': {
						color: 'text.secondary',
						fontSize: '18px',
					},
				},
				notchedOutline: {
					borderColor: colors.inputBorderGrey,
				},
				input: {
					'&::placeholder': {
						color: colors.grey
					}
				}
			},
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					color: 'red',
					textAlign: 'start',
				},
			},
		},
		MuiInputAdornment: {
			styleOverrides: {
				root: {
					'& .MuiTypography-root': {
						fontSize: '12px'
					},
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					color: colors.font.secondary
				},
			},
		},
		MuiPopover: {
			styleOverrides: {
				paper: {
					overflow: 'visible',
				},
			},
		},
		MuiAutocomplete: {
			styleOverrides: {
				option: {
					color: 'black'
				}
			}
		},
		MuiLinearProgress: {
			styleOverrides: {
				colorPrimary: {
					backgroundColor: 'rgba(0, 0, 0, 0.1)',
				},
			},
		},
	},
});
