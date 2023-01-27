import { createTheme, ThemeOptions } from '@mui/material';
//CreateTheme -> import default theme and will override it with our options
//ThemeOptions -> type interface

export const customTheme: ThemeOptions = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: 'rgba(168, 85, 247,.65)',
            light: 'rgba(168, 85, 247,.80)',
            dark: 'rgba(168, 85, 247,.28)',
        },
        background: {
            paper: '#151515',
            default: 'rgba(0,0,0,.96)'
        },
    }
})