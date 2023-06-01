export default function _appendGhost(fallback, evt) {
    console.log(fallback,evt);
    this.awaitingDragStarted = false;
  
        pluginEvent('dragStarted', this, {
            evt: evt
        });

        if (this.nativeDraggable) {
            on(document, 'dragover', _checkOutsideTargetEl);
        }

        var options = this.options; // Apply effect

        !fallback && toggleClass(dragEl, options.dragClass, false);
        toggleClass(dragEl, options.ghostClass, true);
        Sortable.active = this;
        fallback && this._appendGhost(); // Drag start event

        _dispatchEvent({
            sortable: this,
            name: 'start',
            originalEvent: evt
        });
    
}