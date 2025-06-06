"use client";
import { Camera, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, CircleCheckBig, Info, Loader } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import React from 'react'

const Setup = () => {

    const [currentStep, setCurrentStep] = useState(1);
    const [deviceID, setDeviceID] = useState("");
    const [buttonText, setButtonText] = useState("Check Device Status");

    const [isOnline, setIsOnline] = useState(false);
    const [isCommunicationable, setisCommunicationable] = useState(false);
    const [isOnlineLoader, setIsOnlineLoader] = useState<boolean | null>(null);
    const [isCommunicationLoader, setIsCommunicationLoader] = useState<boolean | null>(null);
    const [cameraFound, setCameraFound] = useState(false);
    const [cameraFoundLoader, setCameraFoundLoader] = useState(false);

    const availableCamera = [
        {
            id: 1,
            name: "Front door",
            ip: '192.12.09.32'
        },
        {
            id: 2,
            name: "Front Lobby",
            ip: '192.12.09.32'
        },
        {
            id: 3,
            name: "Drawing room",
            ip: '192.12.09.32'
        }
    ]

    const handleStepClick = (stepNumber: number) => {
        setCurrentStep(stepNumber);
    };

    const handleNextStep = () => {

        if (['Check Device Status'].includes(buttonText)) {
            setIsOnlineLoader(true);
            setIsOnline(true);
            setTimeout(() => {
                setButtonText("Test Communication");
                setIsOnlineLoader(false);
            }, 5000);
        }

        if (['Test Communication'].includes(buttonText)) {
            setIsCommunicationLoader(true);
            setisCommunicationable(true);
            setTimeout(() => {
                setButtonText("Next");
                setIsCommunicationLoader(false);
            }, 5000);
        }

        if (['Next'].includes(buttonText) && currentStep == 1) {
            setCurrentStep(2);
            setButtonText("Start Camera Discovery");
        }

        if (['Start Camera Discovery'].includes(buttonText)) {
            setCameraFoundLoader(true)
            setCameraFound(true);
            setTimeout(() => {
                setButtonText("Next");
                setCameraFoundLoader(false)
            }, 5000);
        }

        if (['Next'].includes(buttonText) && currentStep == 2) {
            setCurrentStep(3);
            setButtonText("Next");
        }

        if (['Next'].includes(buttonText) && currentStep == 3) {
            setCurrentStep(4);
            setButtonText("Finish Setup");
        }

    }

    const handlePrev=()=>{
        if(currentStep==1) return;
        setCurrentStep((prev)=>prev-1)
        setButtonText("Next");
    }





    //////////////

    const [formData, setFormData] = useState<any>({
      deviceId: '',
      s3curaId: '',
      deviceStatus: 'idle', // idle, checking, online, offline, already_attached
      communicationStatus: 'idle', // idle, checking, confirmed, failed
      discoveryStatus: 'idle', // idle, discovering, completed, failed
      cameras: [],
      configuredCameras: [],
      attachedCameras: [] // Cameras already attached to a device
    });
  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showAttachedCameras, setShowAttachedCameras] = useState(false);
    const [hoveredInfo, setHoveredInfo] = useState(null);
  
    // Simulate device status check
    // const checkDeviceStatus = async () => {
    //   setLoading(true);
    //   setError('');
    //   setFormData(prev => ({ ...prev, deviceStatus: 'checking' }));
      
    //   // Simulate API call
    //   setTimeout(() => {
    //     // Simulate different scenarios
    //     const scenarios = ['online', 'offline', 'already_attached'];
    //     const randomScenario = 'online'; // For demo, always set to online
        
    //     if (randomScenario == 'already_attached') {
    //       setError('Device is already attached to another S3CURA account');
    //       setFormData(prev => ({ ...prev, deviceStatus: 'already_attached' }));
    //     } else {
    //       setFormData(prev => ({ ...prev, deviceStatus: randomScenario }));
    //     }
    //     setLoading(false);
    //   }, 2000);
    // };
  
    // Simulate communication check
    // const checkCommunication = async () => {
    //   setLoading(true);
    //   setFormData(prev => ({ ...prev, communicationStatus: 'checking' }));
      
    //   setTimeout(() => {
    //     setFormData(prev => ({ ...prev, communicationStatus: 'confirmed' }));
    //     setLoading(false);
    //   }, 1500);
    // };
  
    // Simulate camera discovery
    // const discoverCameras = async () => {
    //   setLoading(true);
    //   setFormData(prev => ({ ...prev, discoveryStatus: 'discovering' }));
      
    //   setTimeout(() => {
    //     const mockCameras = [
    //       { id: 1, ip: '192.168.1.101', rtspUrl: 'rtsp://192.168.1.101:554/stream1', location: '', context: '', active: true },
    //       { id: 2, ip: '192.168.1.102', rtspUrl: 'rtsp://192.168.1.102:554/stream1', location: '', context: '', active: true },
    //       { id: 3, ip: '192.168.1.103', rtspUrl: 'rtsp://192.168.1.103:554/stream1', location: '', context: '', active: true }
    //     ];
        
    //     const mockAttachedCameras = [
    //       { id: 4, ip: '192.168.1.104', rtspUrl: 'rtsp://192.168.1.104:554/stream1', location: 'Front Gate', context: 'Security Monitoring', active: true, deviceId: 'RASP-001' },
    //       { id: 5, ip: '192.168.1.105', rtspUrl: 'rtsp://192.168.1.105:554/stream1', location: 'Parking Lot', context: 'Vehicle Tracking', active: true, deviceId: 'RASP-001' }
    //     ];
        
    //     setFormData(prev => ({ 
    //       ...prev, 
    //       cameras: mockCameras,
    //       configuredCameras: mockCameras,
    //       attachedCameras: mockAttachedCameras,
    //       discoveryStatus: 'completed' 
    //     }));
    //     setLoading(false);
    //   }, 3000);
    // };
  
    // Handle camera configuration update
    const updateCameraConfig = (cameraId:any, field:any, value:any) => {
      setFormData((prev:any) => ({
        ...prev,
        configuredCameras: prev.configuredCameras.map((camera:any) =>
          camera.id === cameraId ? { ...camera, [field]: value } : camera
        )
      }));
    };
  
    // Handle finish setup
    const finishSetup = async () => {
        redirect('/home');
        setLoading(true);
        // Simulate API call to trigger EC2 live ingestion
        setTimeout(() => {
            setLoading(false);
            alert('Setup completed successfully! Live ingestion has been initiated.');
        }, 2000);
    };
  
    const steps = [
      { number: 1, title: 'Device Setup', description: 'Connect your Raspberry Pi device' },
      { number: 2, title: 'Camera Discovery', description: 'Find and configure your cameras' },
      { number: 3, title: 'Camera Configuration', description: 'Set up each camera' },
      { number: 4, title: 'Finish Setup', description: 'Review and complete' }
    ];

    

    return (
        <div className="flex min-h-screen h-full flex-col bg-gray-100">
            <main className="flex flex-col items-center w-full mx-auto max-w-7xl">
                <div className="flex flex-col items-center justify-center w-full mx-auto">
                    <div className='flex flex-col gap-2 items-center py-8 px-2'>
                        <h1 className='text-3xl font-bold'>S3CURA Setup Wizard</h1>
                        <p className='text-sm text-gray-600'>Complete the setup to start monitoring your cameras</p>
                    </div>
                    <div className="flex items-start justify-between w-full mx-auto px-4">
                        {steps.map((step, index) => (
                            <div key={step.number} className="flex flex-col items-center flex-1 relative">
                                {/* Step Circle and Content */}
                                <div className="flex flex-col items-center">
                                    {/* Circle */}
                                    <button
                                        onClick={() => handleStepClick(step.number)}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center text-lgx transition-all duration-200 hover:scale-105 relative z-10 ${currentStep === step.number
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : currentStep > step.number
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                            }`}
                                    >
                                        {currentStep > step.number ? (
                                            <CircleCheckBig className='h-5 w-5'/>
                                        ) : (
                                            step.number
                                        )}
                                    </button>

                                    {/* Step Info */}
                                    <div className="mt-4 text-center">
                                        <h3 className={`font-semibold text-sm max-w-32 ${currentStep === step.number
                                            ? 'text-gray-900'
                                            : 'text-gray-600'
                                            }`}>
                                            {step.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1 max-w-32">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Connector Line - placed between circles */}
                                {index < steps.length - 1 && (
                                    <div className={`absolute top-6 left-1/2 right-0 h-1 ${currentStep > step.number
                                        ? 'bg-green-500'
                                        : 'bg-gray-300'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex justify-center mx-auto w-full mt-6'>
                    <div className='max-w-4xl w-full px-6 py-8 rounded-md bg-white'>

                        {
                            currentStep == 1 ?
                                <div className=''>
                                    <div className='flex flex-col gap-2'>
                                        <label className='text-sm text-gray-600' htmlFor="">Device ID</label>
                                        <input onChange={(e) => setDeviceID(e.target.value)} className='border rounded px-4 py-2 focus:outline-none text-xs' type="text" placeholder='Enter your device id' />
                                    </div>
                                    <div className='flex flex-col gap-3 mt-4'>
                                        {
                                            isOnline &&
                                            <>
                                                {
                                                    isOnlineLoader ?
                                                        <div className='flex gap-2 items-center text-blue-600'>
                                                            <Loader className='animate-spin h-4 w-4' />
                                                            <p>checking device status...</p>
                                                        </div>
                                                        :
                                                        <div className='flex gap-2 items-center text-green-600'>
                                                            <CircleCheckBig className='h-4 w-4' />
                                                            <p>Device is online and ready</p>
                                                        </div>
                                                }
                                            </>
                                        }
                                        {
                                            isCommunicationable &&
                                            <>
                                                {
                                                    isCommunicationLoader ?
                                                        <div className='flex gap-2 items-center text-blue-600'>
                                                            <Loader className='animate-spin h-4 w-4' />
                                                            <p>Testing Communication...</p>
                                                        </div>
                                                        :
                                                        <div className='flex gap-2 items-center text-green-600'>
                                                            <CircleCheckBig className='h-4 w-4' />
                                                            <p>Communication confirmed</p>
                                                        </div>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                                :
                            currentStep == 2 ?
                                <div className='flex flex-col'>
                                    <div className='flex justifu-center items-center flex-col gap-2'>
                                        <div className='py-2'>
                                            <Camera className='h-12 w-12 text-blue-600' />
                                        </div>
                                        <h2 className='text-lg font-semibold'>Camera Discovery</h2>
                                        <p className='text-gray-500 text-xs'>We'll scan your network to find all RTSP-enabled cameras</p>
                                    </div>

                                    {
                                        cameraFound &&
                                        <>
                                            {
                                            cameraFoundLoader ?
                                            <div className='mt-4 flex flex-col'>
                                            <div className='flex flex-col gap-2 items-center justify-center gap-3 mb-4'>
                                              <Loader className='animate-spin h-6 w-6 text-blue-600' />
                                              <p className='text-gray-600 text-sm'>Discovering cameras on your network...</p>
                                              <div className='h-1.5 w-full bg-gray-300 rounded-full overflow-hidden'>
                                                <div className='h-full bg-blue-600 rounded-full animate-fill'></div>
                                              </div>
                                            </div>
                                         </div> 
                                         :
                                           <div className='mt-4'>
                                                <div className='flex items-center justify-center gap-3 text-green-600 mb-4 font-semibold'>
                                                    <CircleCheckBig className='h-5 w-5' />
                                                    <span>Found 3 cameras!</span>
                                                </div>
                                                <div className='flex flex-col gap-4'>
                                                    {
                                                        availableCamera.map((camera) => {
                                                            return (
                                                                <div key={camera.id} className='flex justify-between items-center bg-gray-100 rounded-md py-2 px-4'>
                                                                    <div className='flex gap-3 justify-center items-center'>
                                                                        <Camera className='h-5 w-5 text-gray-600' />
                                                                        <div>
                                                                            <h2 className='text-gray-700 text-sm'>{camera.name}</h2>
                                                                            <span className='stext-gray-500 text-xs'>{camera.ip}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <CircleCheckBig className='h-5 w-5 text-green-600' />
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>                                           
                                            }
                                        </>
                                    }


                                </div>
                                :
                            currentStep == 3 ?
                                <div className="space-y-6ß">
                            <h3 className="text-lg font-semibold mb-4">Configure Your Cameras</h3>
                            
                            {/* Attached Cameras Dropdown */}
                            {/* {formData.attachedCameras.length > 0 && ( */}
                              <div className="mb-6">
                                <div 
                                  className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                //   onClick={() => setShowAttachedCameras(!showAttachedCameras)}
                                >
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h4 className="font-semibold text-gray-700">Cameras Already Attached to Device</h4>
                                      <p className="text-sm text-gray-600 mt-1">
                                        {formData.attachedCameras.length} camera(s) configured on this device
                                      </p>
                                    </div>
                                    {showAttachedCameras ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                  </div>
                                </div>
                                
                                {showAttachedCameras && (
                                  <div className="mt-3 space-y-2 border-l-4 border-blue-200 pl-4">
                                    {formData.attachedCameras.map((camera:any, index: number) => (
                                      <div key={camera.id} className="p-3 bg-blue-50 rounded-lg">
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <p className="font-medium text-blue-900">camera.location</p>
                                            <p className="text-sm text-blue-700">camera.contextc</p>
                                            <p className="text-xs text-blue-600 mt-1">IP: 252.12.4.4</p>
                                          </div>
                                          <div className="text-right">
                                            <span className="text-xs text-blue-600">Device: {index}</span>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            {/* )} */}
                
                            {/* New Cameras Configuration */}
                            <div className="space-y-6">
                              <h4 className="font-medium text-gray-700">New Cameras to Configure</h4>
                              {Array.from({length: 3}).map((camera:any, index: number) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-semibold flex items-center space-x-2">
                                      <Camera size={20} />
                                      <span>Camera {index+1}</span>
                                    </h4>
                                    <label className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        // checked={camera.active}
                                        onChange={(e) => updateCameraConfig(camera.id, 'active', e.target.checked)}
                                        className="rounded text-blue-600"
                                      />
                                      <span className="text-sm">Active</span>
                                    </label>
                                  </div>
                                  
                                  <div className="text-sm text-gray-600">
                                    IP: 25212.43.4.4
                                  </div>
                                  
                                  <div className="flex flex-col gap-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                        Location
                                        <div className="relative">
                                          <Info 
                                            size={16} 
                                            className="text-gray-400 cursor-help"
                                            // onMouseEnter={() => setHoveredInfo('location')}
                                            // onMouseLeave={() => setHoveredInfo(null)}
                                          />
                                          {hoveredInfo === 'location' && (
                                            <div className="absolute bottom-6 left-0 bg-gray-800 text-white text-xs rounded-lg p-2 w-48 z-10">
                                              Physical location where the camera is installed (e.g., Main Entrance, Warehouse Floor)
                                            </div>
                                          )}
                                        </div>
                                      </label>
                                      <input
                                        type="text"
                                        // value={camera.location}
                                        onChange={(e) => updateCameraConfig(camera.id, 'location', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="e.g., Main Entrance"
                                      />
                                    </div>
                                    
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                        Context
                                        <div className="relative">
                                          <Info
                                            size={16} 
                                            className="text-gray-400 cursor-help"
                                            // onMouseEnter={() => setHoveredInfo('context')}
                                            // onMouseLeave={() => setHoveredInfo(null)}
                                          />
                                          {hoveredInfo === 'context' && (
                                            <div className="absolute bottom-6 left-0 bg-gray-800 text-white text-xs rounded-lg p-2 w-48 z-10">
                                              Purpose or use case for this camera (e.g., Security Monitoring, People Counting)
                                            </div>
                                          )}
                                        </div>
                                      </label>
                                      <input
                                        type="text"
                                        // value={camera.context}
                                        onChange={(e) => updateCameraConfig(camera.id, 'context', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="e.g., Security monitoring"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                                </div>
                                :
                                <div className="space-y-6">
                                <div className="text-center">
                                  <CheckCircle className="mx-auto mb-4 text-green-600" size={48} />
                                  <h3 className="text-lg font-semibold mb-2">Setup Summary</h3>
                                  <p className="text-gray-600 mb-6">
                                    Review your configuration before finishing setup
                                  </p>
                                </div>
                    
                                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                                  <div>
                                    <p className="text-sm text-gray-600">Device ID</p>
                                    <p className="font-medium">98473yghbe</p>
                                  </div>
                                  
                                  <div>
                                    <p className="text-sm text-gray-600">Total Cameras</p>
                                    <p className="font-medium">4 cameras discovered</p>
                                  </div>
                                  
                                  <div>
                                    <p className="text-sm text-gray-600">Active Cameras</p>
                                    <p className="font-medium">
                                      2 cameras active
                                    </p>
                                  </div>
                                </div>
                    
                                <div className="space-y-3">
                                  <h4 className="font-semibold">Configured Cameras:</h4>
                                  {formData.configuredCameras.filter((c:any) => c.active).map((camera:any) => (
                                    <div key={camera.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                                      <div>
                                        <p className="font-medium">camera location</p>
                                        <p className="text-sm text-gray-600">{camera.context || 'No context specified'}</p>
                                      </div>
                                      <CheckCircle className="text-green-500" size={20} />
                                    </div>
                                  ))}
                                </div>
                    
                                <button
                                  onClick={finishSetup}
                                  disabled={loading}
                                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {loading ? (
                                    <span className="flex items-center justify-center">
                                      <Loader className="animate-spin mr-2" size={20} />
                                      Initiating live ingestion...
                                    </span>
                                  ) : (
                                    'Finish Setup'
                                  )}
                                </button>
                              </div>
                        }
                        <div className='mt-8 flex justify-between w-full'>
                            <button onClick={handlePrev} className={`flex justify-center items-center gap-2 px-2 py-2 ${currentStep == 1 ? "text-gray-300" : "text-gray-500"}`}>
                                <ChevronLeft className='h-4 w-4' />
                                <span>Previous</span>
                            </button>
                            {deviceID && <button onClick={handleNextStep} className={`flex justify-center items-center gap-2 px-2 py-2 rounded bg-blue-600 text-xs text-white ${isOnlineLoader || isCommunicationLoader ||  cameraFoundLoader || currentStep==4 ? "invisible" : "visible"}`}>
                                {buttonText} <span>{buttonText == "Next" ? <ChevronRight className='h-4 w-4' /> : ""}</span>
                            </button>}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Setup


