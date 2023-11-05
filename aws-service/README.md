# AWS Cloud

## API Specification

| Resource        | Method        | Parameters    | Response             |
| --------------- | ------------- | ------------- | -------------------- |
| /clinics | GET || 200: return all clinics |
| /clinics/:id | GET | Clinic ID | 200: return all clinics |
| /schedule| POST || 201: data for newly created appointment |
| /schedule/:date/:clinicId | GET | Date, Clinic ID | 200: return appointments schedule for clinic for specific date

## Database Specification

### DentistimoClinicsTable

```
{
  clinicId : number,	
  name: string,
  owner: string,
  dentists: number,
  address: string,
  city: string,
  coordinate: {
    latitude: number,
    longitude: number
  },
  openingHours: {
    monday: string,
    tuesday: string,
    wednesday: string,
    thursday: string,
    friday: string,
    saturday: string,
    sunday: string
  }
}
```

### DentistimoAppointmentsTable

```
  { 
      clinicId : number,	
      date: string,
      timeSlots: Array<{
        bookings: Array<string>, 
        time: string
        }>
}
```



## Windows Requirements

Enable WSL (on Windows 10/11). Go to ``Settings > Privacy & Security > For Developers``. Check the Developer Mode radio button. Alternatively, search for Developer settings and enable developer mode. In your taskbar, search for “Windows Features”, choose “Turn Windows features on or off”.

Tick Windows Subsystem for Linux and press OK. Reboot your system if prompted. In the Microsoft Store, search for Ubuntu and install the first result. Open Ubuntu and set up a username and password for your linux distribution. 

Restart your computer and enter BIOS and make sure the following settings are set:
Virtualization Enabled
Secure boot Disabled

Then run the following command: <br />
```
wsl.exe –update
```

Open WSL. Install the AWS CLI on your WSL. This can be done by running the command: <br />
```
sudo apt install awscli
```

Next, check to see if you have successfully installed the AWS CLI on your WSL. This can be done by running the command: 
```
aws --version
```

If you then get the following error message: ```Package 'awscli' has no installation candidate```, run the following commands:
```
sudo apt-get update 
sudo apt-get install awscli 

aws --version
```

## MacOS Requirements
Download and run the following package file:
https://awscli.amazonaws.com/AWSCLIV2.pkg.
Clone the repository on your local machine. In a git bash terminal, write “git clone https://git.chalmers.se/courses/dit355/dit356-2022/t-12/t12-project.git ”

## Installation
In WSL (Windows) or Terminal (Mac), run the following command: 
```
aws configure
```

For the access key, provide the following:
```
AKIATRGY6JPYVHNDJHVK
```

For the secret access key, provide the following:
```
YJGEcKfy/OSlx+6I4YU6CiEB+GOxAblhV0bCvm8k
```

For the region, provide:
```
us-east-1
```

For JSON output, leave blank and press enter.

Make sure the configuration was saved by entering the aws configure command again, and leave blank and press enter for all the previously mentioned inputs if you recognise them.

In the command line, path to the directory aws-service in the folder of the cloned repository, by using the following command: (Make sure to use forward slashes / and make sure to remove C: if you already are in /mnt/c ).
```
cd enter_your_aws-service_path
```

For each of the scripts, open them in Visual Studio Code and make sure the file format is set to LF and not CRLF and save the file.

Back to WSL / Terminal, upload the source code files into S3 by running the command:
```
bash create-lambda-zips.sh
```

Run the following command in order to create the tech stack:
```
bash create-stack.sh
```

IMPORTANT: Please wait approx. 5 min before proceeding with the next step in order to ensure the stack is actually created and functional. Run the following command in order to load the DynamoDB table with clinics:
```
bash load-clinics.sh
```
Before you can access the client, you will need the API Gateway URL that was generated on stack creation. In order to get it you’ll need to run:
```
bash get-gateway-url.sh
```
Copy the HTTP link you see under outputs in the result of the command.

(OPTIONAL) If you want to delete the entire tech stack there’s also the command:
```
bash delete-stack.sh
```

This can be run if you want to test creating the stack multiple times, just remember that it will take approx 5 min to delete a stack.
