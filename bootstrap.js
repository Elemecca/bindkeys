
const Cu = Components.utils,
      Ci = Components.interfaces,
      Cc = Components.classes,
      Cm = Components.manager,
      Cr = Cm.QueryInterface( Ci.nsIComponentRegistrar ),
      Sv = Cu.import( "resource://gre/modules/Services.jsm", {} ).Services;

const startup = function (data, reason) {
    // prior to Gecko 10 chrome.manifest wasn't loaded automatically
    if (Sv.vc.compare( Sv.appinfo.platformVersion, "10.0" ) < 0)
        Cm.addBootstrappedManifestLocation( params.installPath );

    // attach key event listener manager
    Cu.import( "chrome://bindkeys/content/lib/WindowWatcher.jsm" );
    WindowWatcher.register();
}

const shutdown = function (data, reason) {
    // don't bother with unregistration when the app is shutting down
    if (APP_SHUTDOWN == reason) return;

    // detach key event listener manager
    Cu.import( "chrome://bindkeys/content/lib/WindowWatcher.jsm" );
    Cu.unload( "chrome://bindkeys/content/lib/WindowWatcher.jsm" );
    WindowWatcher.unregister();

    // prior to Gecko 10 chrome.manifest wasn't loaded automatically
    if (Sv.vc.compare( Sv.appinfo.platformVersion, "10.0" ) < 0)
        Cm.removeBootstrappedManifestLocation( params.installPath );
}

const install = function (data, reason) {
    
}

const uninstall = function (data, reason) {

}
