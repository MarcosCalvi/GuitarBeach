"use strict"

// register the application module
b4w.register("project_guitar_beach_main", function(exports, require) {

// import modules used by the app
var m_app       = require("app");
var m_cfg       = require("config");
var m_data      = require("data");
var m_preloader = require("preloader");
var m_ver       = require("version");
var m_mouse 	= require("mouse");
var m_cont 		= require("container");
var m_fps 		= require("fps");

// detect application mode
var DEBUG = (m_ver.type() == "DEBUG");

// automatically detect assets path
var APP_ASSETS_PATH = m_cfg.get_assets_path("project_guitar_beach");

/**
 * export the method to initialize the app (called at the bottom of this file)
 */
exports.init = function() {
    m_app.init({
        canvas_container_id: "main_canvas_container",
        callback: init_cb,
        show_fps: DEBUG,
        console_verbose: DEBUG,
        autoresize: true
    });
}

/**
 * callback executed when the app is initialized 
 */
function init_cb(canvas_elem, success) {

    if (!success) {
        console.log("b4w init failure");
        return;
    }

    m_preloader.create_preloader();

    // ignore right-click on the canvas element
    canvas_elem.oncontextmenu = function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };

    load();
}

/**
 * load the scene data
 */
function load() {
    m_data.load(APP_ASSETS_PATH + "project_guitar_beach.json", load_cb, preloader_cb);
}

/**
 * update the app's preloader
 */
function preloader_cb(percentage) {
    m_preloader.update_preloader(percentage);
}

/**
 * callback executed when the scene data is loaded
 */
function load_cb(data_id, success) {

    if (!success) {
        console.log("b4w load failure");
        return;
    }

    // m_app.enable_camera_controls();
	m_fps.enable_fps_controls();
	setup_unload();
	setup_mouselook();
    // place your code here

}

var setup_unload = function() {
	var canvas_elem = m_cont.get_canvas();
	document.getElementById("body").addEventListener("onunload", unload_page, false);
}

var setup_mouselook = function() {
	var canvas_elem = m_cont.get_canvas();
    canvas_elem.addEventListener("mouseup", function(e) {
        m_mouse.request_pointerlock(canvas_elem);
    }, false);
}


});

var unload_page = function() {
	window.location.href = "google.com";
}

// import the app module and start the app by calling the init method
b4w.require("project_guitar_beach_main").init();
