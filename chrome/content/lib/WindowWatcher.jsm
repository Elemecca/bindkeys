

const Cu = Components.utils,
      Ci = Components.interfaces,
      Cc = Components.classes;

Cu.import( "resource://gre/modules/Services.jsm" );

const console = Cu.import(
        "resource://gre/modules/devtools/Console.jsm",
        {} ).console;

const WindowWatcher = {};
const C = WindowWatcher;

const observe_topics = [
        "chrome-document-global-created",
        "content-document-global-created",
    ];

const dom_events = [
        "keydown",
        "keypress",
        "keyup",
    ];

C.register = function() {
    for (let topic of observe_topics)
        Services.obs.addObserver( this, topic, false );

    // register on all existing windows
    const windows = Services.wm.getEnumerator( null );
    while (windows.hasMoreElements())
        this.registerWindow( windows.getNext() );
};

C.unregister = function() {
    for (let topic of observe_topics)
        Services.obs.removeObserver( this, topic );

    // unregister from all existing windows
    const windows = Services.wm.getEnumerator( null );
    while (windows.hasMoreElements())
        this.unregisterWindow( windows.getNext() );
};

function getChromeEventTarget (window) {
    return window
        .QueryInterface( Ci.nsIInterfaceRequestor )
        .getInterface( Ci.nsIWebNavigation )
        .QueryInterface( Ci.nsIDocShell )
        .chromeEventHandler;
}

C.registerWindow = function (window) {
    console.info( "bindkeys registering on window", window );
    const target = getChromeEventTarget( window );
    for (let type of dom_events)
        target.addEventListener( type, this, false, false );
};

C.unregisterWindow = function (window) {
    console.info( "bindkeys unregistering from window", window );
    const target = getChromeEventTarget( window );
    for (let type of dom_events)
        target.removeEventListener( type, this, false );
};

C.observe = function (subject, topic, data) {
    switch (topic) {
    case "chrome-document-global-created":
    case "content-document-global-created":
        this.registerWindow( subject );
        return;

    }
};

C.handleEvent = function (event) {
    console.info( "bindkeys saw key event", event );
};

const EXPORTED_SYMBOLS = [ "WindowWatcher" ];
