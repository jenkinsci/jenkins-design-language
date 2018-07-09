// A class to deal with the navigation menus

import { $, ElementSet } from '@jdl2/elementset';

const COLLAPSED_SIZE = 64;
const DEFAULT_SIZE = 272;
const MIN_SIZE = Math.floor(DEFAULT_SIZE / 2.5);
const MAX_SIZE = 512;

type NavigationCallback = () => void;
type NavigationResized = (expanded: boolean, width: number) => void;

function getStored(key: string): string {
    return window.localStorage.getItem(key) || '';
}

function setStored(key: string, value: string) {
    window.localStorage.setItem(key, value);
}

export class SidebarBehavior {
    nav: ElementSet;
    navHandle: ElementSet;
    body: ElementSet;

    isResizing: boolean = false;
    isCollapsed: boolean;
    storedWidth: number;

    startWidth: number;
    mouseStartX: number;

    onResize?: NavigationResized;

    constructor(onResize?: NavigationResized) {
        // Needed elements:
        this.body = $('body');
        this.nav = $('.Nav');
        this.navHandle = $('.NavExpander');

        // Interaction variables
        this.isCollapsed = 'true' === getStored('jdl.navbar.collapsed');
        this.storedWidth = parseInt(getStored('jdl.navbar.width') || '0', 10) || DEFAULT_SIZE;

        // Initialize the nav based on open/closed and default/stored size
        if (this.isCollapsed) {
            this.closeNav();
        } else {
            this.openNav(this.storedWidth);
        }

        this.onResize = onResize;
        this.navHandle.on('mousedown', this.startResize);
        this.navHandle.on('mouseup', this.toggleNav);
    }

    delayRemoveClass = (element: ElementSet, className: string, time: number, cb?: NavigationCallback) => {
        setTimeout(() => {
            element.removeClass(className);
            if (cb) {
                cb();
            }
        }, time);
    };

    // Results in a quick animation collapsing or expanding the nav
    releaseAnimation = (time: number) => {
        // Do this
        this.nav.addClass('is-released');
        this.delayRemoveClass(this.nav, 'is-released', time);
    };

    closeNav = () => {
        this.nav.addClass('is-collapsed');
        this.nav.removeClass('is-expanded');
        this.nav.width(COLLAPSED_SIZE);
        if (!this.isCollapsed) {
            // Remember collapsed state
            setStored('jdl.navbar.collapsed', 'true');
            this.isCollapsed = true;
            this.showMain();
            if (this.onResize) {
                this.onResize(!this.isCollapsed, this.storedWidth);
            }
        }
    };

    openNav = (width: number) => {
        this.nav.addClass('is-expanded');
        this.nav.removeClass('is-collapsed');
        this.nav.width(width);
        if (this.isCollapsed) {
            // Remember collapsed state
            window.localStorage.removeItem('jdl.navbar.collapsed');
            this.isCollapsed = false;
            if (this.onResize) {
                this.onResize(!this.isCollapsed, this.storedWidth);
            }
        }
    };

    toggleNav = () => {
        if (this.isResizing) {
            return;
        }
        if (!this.isCollapsed) {
            this.closeNav();
        } else {
            this.openNav(this.storedWidth);
        }
        this.releaseAnimation(300);
    };

    doResize = (e: MouseEvent) => {
        const mouseMovedX = this.mouseStartX - e.clientX;

        if (!this.body.is('is-dragging')) {
            if (Math.abs(mouseMovedX) > 3) {
                this.body.addClass('is-dragging');
            } else {
                // don't resize until a large enough movement
                return;
            }
        }

        let newWidth = this.startWidth - mouseMovedX;

        // Collapse when too small
        if (newWidth <= MIN_SIZE) {
            this.closeNav();
            return;
        }

        // Keep within bounds
        if (newWidth > MAX_SIZE) {
            newWidth = MAX_SIZE;
        }

        // Update our current width
        this.openNav(newWidth);
        this.isResizing = true;
    };

    stopResize = (e: MouseEvent) => {
        // Make sure to clean up the event listeners
        window.removeEventListener('mousemove', this.doResize, false);
        window.removeEventListener('mouseup', this.stopResize, false);

        this.body.removeClass('is-dragging');

        // Don't do anything if we didn't actually drag the nav
        if (!this.isResizing) {
            return;
        }

        // No longer resizing
        this.isResizing = false;
        const mouseMovedX = this.mouseStartX - e.clientX;
        let newWidth = this.startWidth - mouseMovedX;
        if (newWidth <= MIN_SIZE) {
            this.closeNav();
            return;
        }

        // Keep within bounds
        if (newWidth > MAX_SIZE) {
            newWidth = MAX_SIZE;
        }

        this.storedWidth = newWidth;

        // Remember the last expanded size
        setStored('jdl.navbar.width', '' + this.storedWidth);

        if (this.onResize) {
            this.onResize(!this.isCollapsed, this.storedWidth);
        }
    };

    startResize = (e: MouseEvent) => {
        this.startWidth = this.isCollapsed ? COLLAPSED_SIZE : this.storedWidth;
        this.mouseStartX = e.clientX;
        window.addEventListener('mousemove', this.doResize, false);
        window.addEventListener('mouseup', this.stopResize, false);
    };

    closeSheet = (sheet: Element, cb?: NavigationCallback) => {
        this.body.removeClass('is-showing-nav-overlay');
        this.nav.removeClass('is-showing-sheet');
        this.delayRemoveClass($(sheet), 'is-showing', 300, cb);
    };

    showNavOverlay = () => {
        this.body.addClass('is-showing-nav-overlay');
    };

    closeSheets = (cb?: NavigationCallback) => {
        const sheets = $('.Nav-Sheet.is-showing');
        sheets.each((sheet: Element) => this.closeSheet(sheet, cb));
    };

    showSheet = (sheet: Element, cb?: NavigationCallback) => {
        this.closeSheets();
        if (this.isCollapsed) {
            this.showNavOverlay();
        }
        $(sheet).addClass('is-showing');
        // needed to make the animation look nice
        setTimeout(() => {
            this.nav.addClass('is-showing-sheet');
        }, 30);
        if (cb) {
            setTimeout(cb, 300);
        }
    };

    showMain = (cb?: NavigationCallback) => {
        this.closeSheets(cb);
    };
}
