import { trigger, state, transition, style, animate } from "@angular/animations";

export const slideInOutTrigger = trigger('slideInOutTrigger', [
        state('in', style({
            'height': '0px',
            'overflow': 'hidden'
        })),
        state('out', style({
            'height': '*',
            'overflow': 'hidden'
        })),
        transition('in <=> out', animate('300ms ease-in-out'))
    ])

