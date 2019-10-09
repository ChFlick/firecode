import { Documentation } from "./types";

// Mostly extracted from https://firebase.google.com/docs/reference/rules/index-all
export const methodDoc: Readonly<Documentation> = {
    duration: {
        doc: 'Globally available duration functions. These functions are accessed using the `duration.` prefix.',
        childs: {
            abs: {
                header: 'abs(duration) returns rules.Duration',
                doc: 'Absolute value of a duration.'
            },
            time: {
                header: 'time(hours, mins, secs, nanos) returns rules.Duration',
                doc: 'Create a duration from hours, minutes, seconds, and nanoseconds.'
            },
            value: {
                header: 'value(magnitude, unit) returns rules.Duration',
                doc: 'Create a duration from a numeric magnitude and string unit.'
            },
        }
    },
    latlng: {
        doc: 'Globally available latitude-longitude functions. These functions are accessed using the `latlng.` prefix.',
        childs: {
            value: {
                header: 'value(lat, lng) returns rules.LatLng',
                doc: 'Create a LatLng from floating point coordinates.'
            }
        }
    },
    exists: {
        header: 'exists(path) returns rules.Boolean',
        doc: 'Check if a document exists.'
    },
    existsAfter: {
        header: 'existsAfter(path) returns rules.Boolean',
        doc: 'Check if a document exists, assuming the current request succeeds. Equivalent to getAfter(path) != null.'
    },
    get: {
        header: 'get(path) returns rules.firestore.Resource',
        doc: 'Get the contents of a firestore document.'
    },
    getAfter: {
        header: 'getAfter(path) returns rules.firestore.Resource',
        doc: 'Get the projected contents of a document. The document is returned as if the current request had succeeded. Useful for validating documents that are part of a batched write or transaction.'
    },
    math: {
        doc: 'Globally available mathematical functions. These functions are accessed using the `math.` prefix and operate on numerical values.',
        childs: {
            abs: {
                header: 'abs(num) returns number',
                doc: 'Absolute value of a numeric value.'
            },
            ceil: {
                header: 'ceil(num) returns rules.Integer',
                doc: 'Ceiling of the numeric value.'
            },
            floor: {
                header: 'floor(num) returns rules.Integer',
                doc: 'Ceiling of the numeric value.'
            },
            isInfinite: {
                header: 'isInfinite(num) returns rules.Boolean',
                doc: 'Test whether the value is ±∞.'
            },
            isNaN: {
                header: 'isNaN(num) returns rules.Boolean',
                doc: 'Test whether the value is NaN.'
            },
            round: {
                header: 'round(num) returns rules.Integer',
                doc: 'Round the input value to the nearest int.'
            }
        }
    },
    timestamp: {
        doc: 'Globally available timestamp functions. These functions are accessed using the `timestamp.` prefix.',
        childs: {
            date: {
                header: 'date(year, month, day) returns rules.Timestamp',
                doc: 'Make a timestamp from a year, month, and day.'
            },
            value: {
                header: 'value(epochMillis) returns rules.Timestamp',
                doc: 'Make a timestamp from an epoch time in milliseconds.'
            }
        }
    }
};