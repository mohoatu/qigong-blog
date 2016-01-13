var fs = require('fs');

module.exports = {
    getValueFromJson: function (finderkey, res, callback) {
        if (typeof res === 'undefined') return null;
        result = JSON.parse(res);
        var value = "Not Available";
        if (typeof result === 'object') {
            var allKeys = {},
                allKeys1 = {},
                allKeys2 = {},
                allKeys3 = {};
            allKeys = Object.keys(result);
            if (allKeys.length > 0) {
                for (i = 0; i < allKeys.length; i++) {
                    if (allKeys[i] === finderkey) {
                        value = result[finderkey];
                        return value;
                    }
                    key = allKeys[i];
                    var myVal = result[key];
                    if (typeof myVal === 'object') {
                        allKeys1 = Object.keys(myVal);
                        for (i = 0; i < allKeys1.length; i++) {
                            key1 = allKeys1[i];
                            var myVal1 = myVal[key1];
                            if (Array.isArray(myVal1)) {
                                for (j = 0; j < myVal1.length; j++) {
                                    var obj2 = myVal1[j];
                                    allKeys2 = Object.keys(obj2);
                                    for (k = 0; k < allKeys2.length; k++) {
                                        if (allKeys2[k] === finderkey) {
                                            value = obj2[finderkey];
                                            if (typeof value === 'string') return obj2[finderkey];
                                            if (typeof value === 'object') return obj2[finderkey][0].value;
                                        }
                                        var obj3 = obj2[allKeys2[k]];
                                        if (Array.isArray(obj3)) {
                                            for (l = 0; l < obj3.length; l++) {
                                                allKeys3 = Object.keys(obj3[l]);
                                                for (m = 0; m < allKeys3.length; m++) {
                                                    keyy = allKeys3[m];
                                                    if (allKeys3[m] === finderkey) {
                                                        value = obj3[l][finderkey];
                                                        if (typeof value === 'string') return obj3[l][finderkey];
                                                        if (typeof value === 'object') return obj3[l][finderkey][0].value;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return value;
    }
};