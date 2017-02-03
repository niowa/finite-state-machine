"use strict";
class FSM {
    constructor(config) {
        if (!config) throw new Error();
        this.step = 0;
        this.config = config;
        this.arrStates = [];
        this.arrStates[this.step] = this.config.initial;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.arrStates[this.step];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        //if (!this.getState()) throw new Error();
        var check = 0;
        for (let st in this.config.states) {
            if (st == state) check++;
        }
        if (check == 0) throw new Error();
        this.arrStates[++this.step] = state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event

     */



    trigger(event) {
        let nowState = this.arrStates[this.step];
        for (var st in this.config.states) {
            if (st == nowState) {
                var check = 0;
                for (var trans in this.config.states[st].transitions) {
                    if (trans == event) {
                        this.arrStates[++this.step] = this.config.states[st].transitions[trans];
                        check++;
                    }
                }
            }
        }
        if (check == 0) throw new Error();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        return this.arrStates[++this.step] = this.arrStates[0];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (!event) return Object.keys(this.config.states);
        var events = [];
        for (var st in this.config.states) {
            for (var trans in this.config.states[st].transitions) {
                if (trans == event) {
                    events.push(st);
                }
            }
        }
        return events;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.step - 1 > -1) {
            this.arrStates[--this.step];
            return true;
        }
        else return false;

    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.arrStates.length - 1 > this.step) {
            this.arrStates[this.step] = this.arrStates[++this.step];
            return true;
        }
        else return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.arrStates.splice(0, this.arrStates.length);
        this.step = 0;
    }
}

module.exports = FSM;


/** @Created by Uladzimir Halushka **/
