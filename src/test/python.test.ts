import { exec } from 'child_process';

suite('Python Subprocess Test', () => {
    test('should call a Python subprocess', (done) => {
        console.log("Python Subprocess Test");
        exec('python myscript.py', (error, stdout, stderr) => {
            if (error) {
                done(error);
            } else {
                // Assert the output or perform other checks
                // expect(stdout).toContain('Hello, World!');
                done();
            }
        });

        

    });
});
