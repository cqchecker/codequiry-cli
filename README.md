# Node.js CLI for the Code Plagiarism Checker API for Codequiry

## Detail
Command Line Interface (CLI) to interact with the Plagiarism Checker API that scans for code plagiarism in a group cluster or on the web. 

## Install
```
npm install
npm install -g .
```

## Usage
After installation, you can use the following commands:

1. `auth`: Authenticate your API key
2. `createCheck`: Create a new plagiarism check
3. `uploadToCheck`: Upload a file to be checked
4. `startCheck`: Start a plagiarism check
5. `retriveCheck`: Retrieve existing checks
6. `checkStatus`: Check the status of a plagiarism check
7. `resultOverview`: Get an overview of the check results
8. `detailedResult`: Get detailed results of a check

## Examples
Here are detailed examples of how to use each command:

### Authenticate
```
codequiry auth
```
This will prompt you to enter your API key for authentication.
If you are not authenticated, you will be prompted to enter your API key:
```
Enter your API key:
```
Once you are authenticated successfully, it will save to apikey.json file and you can see following.
```
Hello, lion!
Your email is victor19930515@outlook.com.
? Choose an action:
❯ Create Check
  Start Check
  Upload to Check
```
### Create Check
This will initiate the process of creating a new check and provide you with a check ID.
```
codequiry createCheck
```
You will be prompted to enter the programming language you want to check and name:
```
? Enter the programming language: 13
? Enter the your name:
```
Available languages are:
```
"available_languages": [
        { id: 13, language: 'Java (.java)' },
        { id: 14, language: 'Python (.py)' },
        { id: 16, language: 'C (.c/.h)' },
        { id: 17, language: 'C/C++ (.cc/.c/.h/.cpp/.hpp)' },
        { id: 18, language: 'C# (.cs)' },
        { id: 20, language: 'Perl (.pl/.sh)' },
        { id: 21, language: 'PHP (.php)' },
        { id: 22, language: 'SQL (.sql)' },
        { id: 23, language: 'VB (.vb/.bas)' },
        { id: 24, language: 'XML (.xml)' },
        { id: 28, language: 'Haskell (.hs/.lhs)' },
        { id: 29, language: 'Pascal (.pas/.inc)' },
        { id: 30, language: 'Go (.go)' },
        { id: 31, language: 'Matlab (.m)' },
        { id: 32, language: 'Lisp (.el)' },
        { id: 33, language: 'Ruby (.rb)' },
        { id: 34, language: 'Assembly (.asm/.s)' },
        { id: 38, language: 'HTML Javascript (.html/.htm/.xhtml)' },
        { id: 39, language: 'Javascript (.js/.ts)' },
        { id: 40, language: 'HTML (.html/.htm/.xhtml)' },
        { id: 41, language: 'Plain text (.txt)' },
        { id: 42, language: 'Text file by char (.txt)' },
        { id: 43, language: 'Swift (.swift)' },
        { id: 44, language: 'Kotlin (.kt/.kts)' },
        { id: 45, language: 'Yacc (.y,.yy,.ypp,.yxx)' },
        { id: 46, language: 'Lex (.l,.ll)' },
        { id: 47, language: 'Elixir (.ex, .exs)' },
        { id: 48, language: 'Python Jupyter Notebook (.ipynb)' },
        { id: 49, language: 'Dart (.dart)' },
        { id: 50, language: 'Shell (.sh/.bash)' },
        { id: 51, language: 'Rust (.rs)' },
        { id: 52, language: 'Scala (.scala)' },
        { id: 53, language: 'R (.r)' },
        { id: 54, language: 'Objective-C (.m, .mm)' },
        { id: 55, language: 'TypeScript (.ts, .tsx)' },
        { id: 56, language: 'Markdown (.md)' },
        { id: 57, language: 'Julia (.jl)' },
        { id: 58, language: 'Groovy (.groovy)' },
        { id: 59, language: 'Sass/SCSS (.scss, .sass)' },
        { id: 60, language: 'CoffeeScript (.coffee)' },
        { id: 61, language: 'Lua (.lua)' },
        { id: 62, language: 'Erlang (.erl, .hrl)' },
        { id: 63, language: 'F# (.fs, .fsi, .fsx)' },
        { id: 64, language: 'Fortran (.f90, .f95)' },
        { id: 65, language: 'Haxe (.hx)' },
        { id: 66, language: 'Scheme (.scm, .ss)' },
        { id: 67, language: 'Tcl (.tcl)' },
        { id: 68, language: 'Ada (.adb, .ads)' },
        { id: 69, language: 'COBOL (.cob, .cbl)' },
        { id: 70, language: 'VHDL (.vhd, .vhdl)' }
    ]
```

### Upload to Check
This will upload files in uploads folder to check.
**Files in uploads folder must be zip files.**
```
codequiry uploadToCheck
```
You will be prompted to enter check ID.
```
? Enter the check ID:
```

### Start Check
This will start check.
```
codequiry startCheck
```
You will be prompted to enter check ID.
```
? Enter the check ID:
? Select the additional check type: (Use arrow keys)
❯ webcheck
  dbcheck
```
```
dbcheck: If you would like to run the database check
webcheck: If you would like to run the web check
```
### Retrive Check
This will retrive check.
```
codequiry retriveCheck
```

### Get Check Status
This will get check status.
```
codequiry checkStatus
```
You will be prompted to enter check ID.
```
? Enter the check ID:
```

### Get Result Overview
This will get result overview.
```
codequiry resultOverview
```
You will be prompted to enter check ID.
```
? Enter the check ID:
```

### Get Detailed Result
This will get detailed result.
```
codequiry detailedResult
```
You will be prompted to enter check ID and submission ID.
```
? Enter the check ID: 95663
? Enter the submission ID: 220801
```

## Version
Current version: 1.0.0

## License
ISC
