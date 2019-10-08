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


{

	const trade_title = "Exiletrade";
	document.title = trade_title;
	
	const ctrl_key = 29;
	const alt_key = 56;

	const a_key = 30;
	const s_key = 31;
	const f_key = 33;


	const mod = alt_key;
	const key = f_key;

	const ioHook = require('iohook');

	const windowman = require("windowman");

	const id = ioHook.registerShortcut([mod, key], (keys) => {
		windowman.toggle_show(trade_title);
	});

	ioHook.start();
}
