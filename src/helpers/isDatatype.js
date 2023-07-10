// works for any datatype, checks if variable is of the specified datatype: string
//ex.: isDatatype( [] , "Array" ) will return true

const isDatatype = ( variable, datatype ) => 
{
    return Object.prototype.toString.call( variable ) === `[object ${ datatype }]`;
};

module.exports = isDatatype;
