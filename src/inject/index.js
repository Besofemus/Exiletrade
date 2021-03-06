/*
 * SPDX-License-Identifier: GPL-3.0-or-later

 * Copyright (C) 2019 Roman Erdyakov

 * This file is part of Exiletrade.
 * Exiletrade is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */


const customTitlebar = require("custom-electron-titlebar");
const remote = require("electron").remote;

const hotkey = require("./hotkey.js");
const settings = require("./settings.js");
const whisper = require("./whisper.js");
const resource = require("./resource.js").resource;
const path = require("path");
const fs = require("fs");

function include_css(mainwindow, filename)
{	
	let file = fs.readFileSync(path.join(__dirname, filename), "utf8");
	mainwindow.webContents.insertCSS(file);
}


(function main()
 {
	 try {
		 let mainwindow = remote.getCurrentWindow();
		 mainwindow.on("hide", (e) => { settings.close(); });
		 mainwindow.on("minimize", (e) => { mainwindow.hide(); });
		 
		 const menu = new remote.Menu();
		 menu.append(new remote.MenuItem({
			 label: "Settings",
			 click: () => { settings.show(mainwindow); }
		 }));
		 menu.append(new remote.MenuItem({
			 label: "Console",
			 click: () => { mainwindow.toggleDevTools(); }
		 }));

		 const titlebar = new customTitlebar.Titlebar({
			 backgroundColor: customTitlebar.Color.fromHex(resource.title_color),
			 menu: menu,
			 titleHorizontalAlignment: "right"
		 });

		 titlebar.updateTitle(resource.title);
		 
		 hotkey.register(resource.toggle.name, resource.toggle.sequence, () =>
		                 {
			                 if (mainwindow.isVisible()) {
				                 mainwindow.hide();
			                 }
			                 else {
				                 mainwindow.showInactive();
			                 }
		                 });

		 hotkey.register(resource.settings.name, resource.settings.sequence,
		                 () => { settings.show(mainwindow); });

		 document.onclick = whisper.hook;
		 include_css(mainwindow, "scrollbar.css");
	 }
	 catch (err) {
		 console.log(err);
	 }
 }());
