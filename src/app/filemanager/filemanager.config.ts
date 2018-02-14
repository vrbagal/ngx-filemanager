export class FilemanagerConfig {
    private static _config: configData;

    public static getConfig() {
        FilemanagerConfig._config = {
            apBaseiUrl: "http://localhost/FM.Api/api",
            listAction: "/list",
            rootPath:"E:\\projects"
        }

        return FilemanagerConfig._config;
    }



}

interface configData {
    rootPath:string;
    apBaseiUrl: string;
    listAction: string;

}