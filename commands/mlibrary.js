var capitalize = require('./functions');

module.exports = function(vscode, fs, path, pathdir) {
    vscode.window.showInputBox({
        prompt: "name of library",
        placeHolder: "set helper library"
    }).then(function(val) {
        if (val.length == 0) {
            vscode.window.showErrorMessage("You should insert file name .");

        } else {
            var pathfile = path.join(pathdir + "/application/libraries", capitalize.capitalize(val)) + ".php";
            fs.access(pathfile, function(err) {
                if (!err) {
                    vscode.window.showWarningMessage("Name of file already exists  !");

                } else {


                    fs.open(pathfile, "w+", function(err, fd) {
                        if (err) throw err;
                        fs.writeFileSync(fd, `<?php 
defined('BASEPATH') OR exit('No direct script access allowed');
                        
class ` + capitalize.capitalize(val) + `
{
                        
public function __construct()
{
                                
}
                        
                            
}
                                                
/* End of file ` + val + `.php */
    
                        `);
                        fs.close(fd);
                        var openPath = vscode.Uri.file(pathfile); //A request file path

                        vscode.workspace.openTextDocument(openPath).then(function(val) {
                            vscode.window.showTextDocument(val);

                        });

                    });
                    vscode.window.showInformationMessage('Created successfully! ');

                }


            });


        }

    });


}