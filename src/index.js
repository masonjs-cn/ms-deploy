const scpClient = require('scp2');
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
const Client = require('ssh2').Client;

function deployToServer(server) {
    const spinner = ora('正在发布到' + server.name + '服务器...').start();

    const conn = new Client();
    conn.on('ready', function() {
        let dels = server.del.map(item => `rm -rf ${item}`).join('\n');
        conn.exec(dels, function(err, stream) {
            if (err) throw err;
            stream
                .on('close', function(code, signal) {
                    spinner.start();
                    scpClient.scp(
                        server.dist,
                        {
                            host: server.host,
                            port: server.port,
                            username: server.username,
                            password: server.password,
                            path: server.path
                        },
                        function(err) {
                            spinner.stop();
                            if (err) {
                                console.log(chalk.red('发布失败.\n'));
                                throw err;
                            } else {
                                console.log(chalk.green('Success! 成功发布到生产服务器! \n'));
                                console.log(server.url);
                            }
                        }
                    );
                    conn.end();
                })
                .on('data', function(data) {
                    console.log('STDOUT: ' + data);
                })
                .stderr.on('data', function(data) {
                    console.log('STDERR: ' + data);
                });
        });
    }).connect({
        host: server.host,
        port: server.port,
        username: server.username,
        password: server.password
    });
}

function selectServer(servers) {
    const choices = servers.map(server => ({
        name: server.name,
        value: server
    }));

    inquirer.prompt([
        {
            type: 'list',
            name: 'selectedServer',
            message: '请选择要部署的服务器:',
            choices: choices
        }
    ]).then(answers => {
        deployToServer(answers.selectedServer);
    });
}


module.exports = selectServer;
