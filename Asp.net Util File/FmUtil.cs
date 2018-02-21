using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Util
{
    public class FmUtil
    {
        private static string GetfullPath(string rootPath, string path)
        {
            return Path.Combine(rootPath.TrimEnd('\\'), path.Trim('\\'));
        }
                
        public static IEnumerable<FmItem> GetFiles(string rootPath,string path)
        {
            var fullPath = GetfullPath(rootPath, path);

            var listofstring = new List<string >();

            listofstring.AddRange(Directory.GetDirectories(fullPath));
            listofstring.AddRange(Directory.GetFiles(fullPath));

            foreach (string fPath in listofstring)
                yield return GetFileItem(fPath);
        }

        public static bool RenameFileFolder(string rootpath, string path, string fileName)
        {
            var fullPath = GetfullPath(rootpath, path);
            var newpath = GetfullPath(fullPath.Replace(Path.GetFileName(fullPath),"") ,fileName);

            var fileAttr = File.GetAttributes(fullPath);

            if ((fileAttr & FileAttributes.Directory) == FileAttributes.Directory)
                Directory.Move(fullPath, newpath);
            else
                File.Move(fullPath, newpath);

            return true;
        }


        private static FmItem GetFileItem(string path)
        {
            var fileAttr = File.GetAttributes(path);

             var item = new FmItem();

            item.name = Path.GetFileName(path);
            item.type =((fileAttr & FileAttributes.Directory) == FileAttributes.Directory) ? "dir":"file";
            item.dtCreated = File.GetLastWriteTimeUtc(path);
            if (item.type!="dir")
            item.size = new FileInfo(path).Length;

            return item;
                          
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
}