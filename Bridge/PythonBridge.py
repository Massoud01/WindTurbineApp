import matlab.engine
import time
import requests

try:
    eng = matlab.engine.start_matlab()

    model_path = r"C:\Users\User\Downloads\mdpData.slx"
    start_time = time.time()
    sim_data = eng.sim(model_path, nargout=0)
    end_time = time.time()
    elapsed_time = end_time - start_time
    print("Simulation took {:.2f} seconds.".format(elapsed_time))
    
    try:
        P = eng.workspace['P']
        t = eng.workspace['t']
        VBR = eng.workspace['VBR']
        Vcharge = eng.workspace['Vcharge']
        Vterre = eng.workspace['Vterre']
        
        simulation_data = {
    'P': [float(x[0]) for x in P],
    #'t': [float(x[0]) for x in t],
    #'VBR': [float(x[0]) for x in VBR],
    #'Vcharge': [float(x[0]) for x in Vcharge],
    #'Vterre': [float(x[0]) for x in Vterre]
        }
        VBR_data={
            'VBR': [float(x[0]) for x in VBR],
        }
        Vcharge_data={
            'Vcharge': [float(x[0]) for x in Vcharge],
        }
      

        response = requests.post('http://192.168.1.102:5000/update_data', json={'simulation_data': simulation_data})
        response3 = requests.post('http://192.168.1.102:5000/update_data_VBR', json={'simulation_data_VBR': VBR_data})
        response4 = requests.post('http://192.168.1.102:5000/update_data_VCHARGE', json={'simulation_data_VCharge': Vcharge_data})
                        

        print("Response status code:", response.status_code)  # Print the status code
        print("Response content:", response.content)  # Print the response content

        if response.status_code == 200:
            print("Data sent successfully to the server.")
        else:
            print("Failed to send data. Server responded with status code:", response.status_code)
        
    except KeyError as e:
        print("Error accessing variable:", e)
    
except matlab.engine.EngineError as e:
    print("Error:", e)
