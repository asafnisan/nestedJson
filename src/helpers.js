var helpers = (() => {
    function flatDataCommentRemover(flatData, commentID) {
        var data = flatData.map((comment) => {
            return Object.assign({}, comment)
        })
        var dataWithRemovedComment = []
        for(var i = 0; i < data.length; i++) {
            if(data[i].ID !== commentID){
                dataWithRemovedComment.push(data[i])
            }
        }
        console.log('logging dataWithRemovedComment')
        console.log(dataWithRemovedComment)
        console.log('logging commentId')
        console.log(commentID)
        return dataWithRemovedComment
    }
    function toNested(flatData) {
        var preNested = flatData.map((comment) => {
            return Object.assign({}, comment)
        })

        for(var i = 0; i < preNested.length; i++) {
            if(preNested[i].parentID === undefined || preNested[i].parentID === 0) {
                preNested[i].parentID = null
            }
        }
        var toBeNested = {}
        for(i = 0; i < preNested.length; i++) {
            toBeNested[preNested[i].ID] = preNested[i]
        }

        for(var key in toBeNested) {
            if(toBeNested[key].parentID && toBeNested[toBeNested[key].parentID]) {
                var parent = toBeNested[toBeNested[key].parentID]
                if(parent.children) {
                    parent.children.push(toBeNested[key])
                } else {
                    parent.children = []
                    parent.children.push(toBeNested[key])
                }
            }
        }
        var nested = [];
        for(key in toBeNested) {
            if(toBeNested[key].parentID === null) {
                nested.push(toBeNested[key])
            }
        }
        return nested
    }
    return {flatDataCommentRemover,toNested}    

})()

export default helpers