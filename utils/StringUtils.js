module.exports = {
    regexIdFingerPrint(str){
        const regex = '[0-9]{1,9999}';
        return str.match(regex)[0]
    }
}