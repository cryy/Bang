import { Theme, createTheme } from "@material-ui/core";

export class ThemeService {

    private _theme: Theme;

    constructor() {
        this._theme = createTheme({
            palette: {
                mode: "light"
            }
        });
    }

    get theme() {
        return this._theme;
    }
}