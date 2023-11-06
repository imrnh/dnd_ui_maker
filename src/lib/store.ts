import { writable } from 'svelte/store';

/**
 * Modal handling.
 *   
 *   @ show_modal -> Triggers the modal visiblity.
 *   @ modal_body -> Contents the content of the modal body. This will be visible in modal.
 * 
 */
export const show_modal = writable(false);
export const modal_body = writable(null);