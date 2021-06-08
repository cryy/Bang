import { Theme, createTheme } from "@material-ui/core";

export class ThemeService {

    private _theme: Theme;

    constructor() {
        this._theme = createTheme({
            shape: {
                borderRadius: 5
            },
            typography: {
                fontFamily: "'Source Sans Pro', sans-serif"
            },
            palette: {
                mode: "light",
                primary: {
                    main: "#1990e9",
                },
                secondary: {
                    main: "#f55790",
                }
            }
        });
    }

    get theme() {
        return this._theme;
    }
}