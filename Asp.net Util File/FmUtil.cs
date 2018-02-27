using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Util
{
    public class FmUtil
    {
        private static string GetfullPath(string rootPath, params string[] path)
        {
            var cleanpaths = new List<string> { rootPath.TrimEnd('\\') };
            cleanpaths.AddRange(path.Select(x => x.Trim('\\')));

            return Path.Combine(cleanpaths.ToArray());
        }

        public static IEnumerable<FmItem> GetFiles(string rootPath, string path)
        {
            var fullPath = GetfullPath(rootPath, path);

            var listofstring = new List<string>();

            listofstring.AddRange(Directory.GetDirectories(fullPath));
            listofstring.AddRange(Directory.GetFiles(fullPath));

            foreach (string fPath in listofstring)
                yield return GetFileItem(fPath);
        }

        public static bool RenameFileFolder(string rootpath, string path, string fileName)
        {
            var fullPath = GetfullPath(rootpath, path);
            var newpath = GetfullPath(fullPath.Replace(Path.GetFileName(fullPath), ""), fileName);

            var fileAttr = File.GetAttributes(fullPath);

            if ((fileAttr & FileAttributes.Directory) == FileAttributes.Directory)
                Directory.Move(fullPath, newpath);
            else
                File.Move(fullPath, newpath);

            return true;
        }

        public static async Task<bool> DeleteFiles(string rootPath, string[] filePaths)
        {                      

            foreach (string path in filePaths)
            {
                string newPath = GetfullPath(rootPath, path);

                if (!IsDir(newPath))
                {
                    if (File.Exists(newPath))
                        File.Delete(newPath);                    
                }
                else
                {
                    if (Directory.Exists(newPath))
                        Directory.Delete(newPath, true);
                }
                
            }

            return await Task.FromResult<bool>(true);
        }

        public static bool CreateNewFolder(string rootPath, string path, string newFolderName)
        {
            path = GetfullPath(rootPath, path, newFolderName);

            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);
            return true;
        }

        public static async Task<bool> CopyTo(string rootPath, string sourcePath, string newPath, bool IsMove)
        {
            sourcePath = GetfullPath(rootPath, sourcePath);
            newPath = GetfullPath(rootPath, newPath);

            var fileAttr = File.GetAttributes(sourcePath);

            if ((fileAttr & FileAttributes.Directory) == FileAttributes.Directory)
                await Copydir(sourcePath, newPath);
            else
                File.Copy(sourcePath, newPath);

            return true;

        }

        private static async Task Copydir(string source, string dest)
        {
            if (!Directory.Exists(dest))
                Directory.CreateDirectory(dest);

            Parallel.ForEach<string>(Directory.GetFiles(source), (filePath) =>
             {
                 var fileName = Path.GetFileName(filePath);
                 var newFileLocation = Path.Combine(dest, fileName);

                 File.Copy(filePath, newFileLocation);
             });

            Parallel.ForEach<string>(Directory.GetDirectories(source), async (dirPath) =>
             {
                 var newDirPath = Path.Combine(dest, Path.GetDirectoryName(dirPath));
                 await Copydir(dirPath, newDirPath);
             });

        }


        private static FmItem GetFileItem(string path)
        {
            var fileAttr = File.GetAttributes(path);

            var item = new FmItem();

            item.name = Path.GetFileName(path);
            item.type = ((fileAttr & FileAttributes.Directory) == FileAttributes.Directory) ? "dir" : "file";
            item.dtCreated = File.GetLastWriteTimeUtc(path);
            if (item.type != "dir")
                item.size = new FileInfo(path).Length;

            return item;
        }

        private static bool IsDir(string path)
        {
            var fileAttr = File.GetAttributes(path);
            return ((fileAttr & FileAttributes.Directory) == FileAttributes.Directory);
        }

        public static async Task<DownloadInfo> GetDownLoad(string rootPath, string[] filePaths)
        {
            var data = new DownloadInfo();

            if (filePaths.Count() == 1)
            {//single selection 
                string path = GetfullPath(rootPath, filePaths[0]);
                if (!IsDir(path))
                {
                    data.FileName = Path.GetFileName(path);
                    var fileData = await Task.FromResult<byte[]>(File.ReadAllBytes(path));
                    data.dataBytes = fileData;
                    return data;                        
                }
            }

            foreach (string path in filePaths)
            {
                var newpath = GetfullPath(rootPath, path);
            }

            return await Task.FromResult<DownloadInfo>(null);
        }

    }

    public class FmItem
    {
        public string name { get; set; }
        public string path { get; set; }
        public DateTime dtCreated { get; set; }
        public string type { get; set; }

        public decimal size { get; set; }
    }

    public class DownloadInfo
    {
        public string FileName { get; set; }
        public string type { get; set; }
        public byte[] dataBytes { get; set; }
    }
}
