export const PATTERN = /^\+?\d[\d -]{8,12}\d/;
export const SPECIAL_CHARACTER = /^[^*|\":<>[\]{}`\\()';@%~!#&$.,]+$/;
export const SPECIAL_CHAR = /^[^*|\":<>[\]{}`\\()';@%~!#&$,\s]+$/;
export const NO_CHAR = /[a-zA-Z]+$/;
export const NO_NUMBERS = /[0-9]+$/;
export const EMPTY = '';
export const MOBILE_NO_LIMIT_1 = 9;
export const MOBILE_NO_LIMIT_2 = 14;
export const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const XSD_PATTERN = /[a-zA-Z 0-9_.,;:'-]+$/;
export const NAME_REGEXP = /['A-Za-z']+$/;
export const INVALID_PATTERN = /['&<']+$/;
export const ALPHA_NUM = /['a-zA-Z0-9']+$/;
export const ADDRESS_PATTERN = /^[a-zA-Z0-9.-\s]+$/;