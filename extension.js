'use strict';

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "matrix42-setup-inf" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('matrix42-setup-inf.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Matrix42 Setup.inf!');
	});

	context.subscriptions.push(disposable);

	let dispInsertInfo = vscode.commands.registerCommand('matrix42-setup-inf.insertInfo', function () {

		let textTypeList = ['SetupInfo', 'Setup']

	vscode.window.showQuickPick(textTypeList, {placeHolder: 'Text Type'}).then(
		result => {
			if (result === 'SetupInfo')
			{
				insertText(getSetupInfoTemplate());
			} else if (result === 'Setup')
			{
				insertText(getSetupTemplate());
			}
		}
	)
	});	
	context.subscriptions.push(dispInsertInfo);

	let dispJumpSection = vscode.commands.registerCommand('matrix42-setup-inf.jumpSection', function () {
		let editor = vscode.window.activeTextEditor;

		if (!editor)
			return;
	
		let selection = editor.selection;
		let text = editor.document.lineAt(selection.start).text;

		if (!text.startsWith('#'))
			return;

		let target = text.split(',', 1);
		
		if (target[0] === '')
			return;

		// let section = '\[' + target[0].substring(1) + '\]';
		// //let position = editor.document.getText().indexOf(section);
		// let reg = new RegExp(section);
		// let pos = editor.document.getWordRangeAtPosition(new vscode.Position(0, 0), reg);


		// let position = editor.selection.active;
		// var newPosition = position.with(200, 0);
        // var newSelection = new vscode.Selection(newPosition, newPosition);
        // editor.selection = newSelection;

		// //editor.revealRange(newSelection.range(), vscode.TextEditorRevealType.InCenter);

		// vscode.window.showInformationMessage(position.toString());
	});
	context.subscriptions.push(dispJumpSection);

}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

let getSetupInfoTemplate = () => {
	let value = '[SetupInfo]\nAuthor                  = \nCreationDate            = ${date}\nInventoryID             = \nDescription             = \nMethod                  = \nTested on               = \nDependencies            = \n'
		+ 'Command line options    = \nLast Change             = ${date}\nBuild                   = 0';

	let today = new Date();
	let todayString = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
		
	value = value.replace('${date}', todayString);
	value = value.replace('${date}', todayString);

	return value;
}

let getSetupTemplate = () => {
	return '[Setup]\nVersion=14.2\nShowCaption=1\nBlockInput=0\nPlatform=*';
}

let insertText = (value) => {
	let editor = vscode.window.activeTextEditor;

	if (!editor)
		return;

	let selection = editor.selection;
	let range = new vscode.Range(selection.start, selection.end);
	editor.edit((editBuilder) => {
		editBuilder.replace(range, value + '\n\n');
	});
}