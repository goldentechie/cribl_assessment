# Crible Assessment

### Problem statement:
A customer has asked you for a way to provide on-demand monitoring of various unix-based servers without having to log into each individual machine and opening up the log files found in /var/log. The customer has asked for the ability to issue a REST request to a machine in order to retrieve logs from /var/log on the machine receiving the REST request.

### Acceptance criteria:

1. A README file describing how to run and use the service.
2. An HTTP REST API exposing at least one endpoint that can return the lines requested from a given log file.
3. The lines returned must be presented with the newest log events first. It is safe to assume that log files will be written with newest events at the end of the file.
4. The REST API should support additional query parameters which include
* The ability to specify a filename within /var/log
* The ability to specify the last n number of entries to retrieve within the log
* The ability to filter results based on basic text/keyword matches
5. The service should work and be reasonable performant when requesting files of >1GB
6. Minimize the number of external dependencies in the business logic code path. For example, if implementing your project with Node.js:
* Feel free to use Express or similar as the HTTP server as well as any of the built-in Node.js modules like fs.
* Please do not use external libraries for any file reads or working with the log lines after you’ve read them. We want to see your solution in this case using only what Node.js has built-in.

## How to run the project

There are two projects: THA (main project), reverse_reader (C++/Node API module to read log files).

### Prerequisite
- Update .env file
- Install node-gyp globally

#### Tested environment
- Windows OS 11
- VS2022 Build Tool
- Node.js v16.20.2

### Step 1 - Install THA dependencies 
```
npm i
```
### Step 2 - Build reverse_reader
```
cd reverse_reader
node-gyp rebuild
cd ..
```
### Step 3 - Run the project
```
npm start
```

## Outcome

This will expose two GET endpoints on port 3000. Every endpoint supports `type=view` query to show a simple UI of result.

### GET /files
It will return a list of files ends with ".log" in the `LOG_DIR` folder.

#### Example response:
```
{
  "files":["example1.log"],
  "message":"1 log file(s).",
  "succeed":true
}
``````
#### How to test
```
curl "http://localhost:3000/files"
```
### GET /search
It will return a list of logs based on the criteria.

#### Query:
```
filename: string;
count: number;
filter: string|undefined;
```

#### Example query:
```
http://localhost:3000/search?filename=example1.log&count=10&filter=received
```

#### Example response:
```
{
  "logs":[
    "Nov 12 02:24:58 ip-172-31-16-82 sshd[21630]: Received disconnect from 34.133.86.38",
    "Nov 12 02:23:08 ip-172-31-16-82 sshd[21626]: Received disconnect from 94.228.163.98",
    "Nov 12 02:22:34 ip-172-31-16-82 sshd[21624]: Received disconnect from 43.153.93.20",
    "Nov 12 02:22:05 ip-172-31-16-82 sshd[21622]: Received disconnect from 34.133.86.38",
    "Nov 12 02:21:00 ip-172-31-16-82 sshd[21619]: Received disconnect from 115.245.120.238",
    "Nov 12 02:20:14 ip-172-31-16-82 sshd[21617]: Received disconnect from 43.156.16.109",
    "Nov 12 02:01:10 ip-172-31-16-82 sshd[21592]: Received disconnect from 124.222.47.200",
    "Nov 12 02:00:06 ip-172-31-16-82 sshd[21590]: Received disconnect from 124.222.47.200",
    "Nov 12 01:59:06 ip-172-31-16-82 sshd[21586]: Received disconnect from 124.222.47.200",
    "Nov 12 01:58:01 ip-172-31-16-82 sshd[21582]: Received disconnect from 124.222.47.200
  ]
}
``````
#### How to test
```
curl "http://localhost:3000/search?filename=example1.log&count=10&filter=received"
```
## Test
### Prerequisite
- Set env var: `LOG_DIR=sample_log_dir`
- Run the application
### Test command
```
npm test
```