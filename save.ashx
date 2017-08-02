<%@ WebHandler Language="C#" Class="save" %>

using System;
using System.IO;
using System.Web;

public class save : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        StreamWriter writer;
        string path = context.Server.MapPath("~/info.txt");
        if (File.Exists(path))
            writer = File.AppendText(path);
        else
            writer = File.CreateText(path);

        writer.Write("SUM: " + context.Request.Form["sum"] + "\r\n");
        writer.Write("Email: " + context.Request.Form["email"] + "\r\n");
        writer.Write("IP: " + context.Request.UserHostAddress + "\r\n");
        writer.Write("AC:" + context.Request.Form["ac"] + "\r\n");
        writer.Write("\r\n-\r\n\r\n");
        writer.Flush();
        writer.Close();
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}