'use babel';

import MyTest01View from './my-test01-view';
import { CompositeDisposable } from 'atom';

export default {

  myTest01View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.myTest01View = new MyTest01View(state.myTest01ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.myTest01View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'my-test01:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.myTest01View.destroy();
  },

  serialize() {
    return {
      myTest01ViewState: this.myTest01View.serialize()
    };
  },

  toggle() {
    atom.notifications.addInfo('Hello World!');
    console.log('MyTest01 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
