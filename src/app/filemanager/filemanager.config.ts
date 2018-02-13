export class FilemanagerConfig {
    private static _config: configData;

    public static getConfig() {
        FilemanagerConfig._config = {
            apBaseiUrl: "http://localhost:5000",
            listAction: "/list",
            rootPath:"D:\\Vikrant Data"
        }

        return FilemanagerConfig._config;
    }



}

interface configData {
    rootPath:string;
    apBaseiUrl: string;
    listAction: string;

}