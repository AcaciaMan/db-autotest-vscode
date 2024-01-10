const python = require('python');
// create new function
export function myFunction() {
    // call python
    const testMethodName = "Test_Config.test_select_alltables";
    // create python class instance
    const instance = new python.Test_Config();
    
    // call class instance method
    const methodName = 'test_select_alltables';
    const methodParams = instance.getTestMethodParameters();
    instance.callTestMethod(methodName, methodParams);
    // print output
    console.log(instance.getTestMethodOutput());

}

