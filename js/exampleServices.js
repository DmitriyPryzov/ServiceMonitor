const exampleServices = [
  {
    "IP_List": [
      "192.168.0.1",
      "10.10.0.25"
    ],
    "Services": [
      {
        "Name": "Test service 1",
        "Version": "1",
        "StartupType": "Automatic",
        "Status": "Running"
      },
      {
        "Name": "Test service 2",
        "Version": "2",
        "StartupType": "Automatic (Delayed Start)",
        "Status": "Stopped"
      },
      {
        "Name": "Test service 3",
        "Version": "3",
        "StartupType": "Manual",
        "Status": "Running"
      },
      {
        "Name": "Test service 4",
        "Version": "4",
        "StartupType": "Automatic",
        "Status": "Running"
      },
      {
        "Name": "Test service 5",
        "Version": "5",
        "StartupType": "Automatic",
        "Status": "Paused"
      }
    ]
  }
]

export default exampleServices;