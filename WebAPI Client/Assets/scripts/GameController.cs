using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class GameController : MonoBehaviour
{
	//Get User
	public InputField input;
	public Button send;
	public Text id;
	public Text name;
	public Text username;
	public Text position;

	//Create
	public InputField id_input;
	public InputField username_input;
	public InputField name_input;
	public InputField position_input;

	public NetworkManager net;


	public void OnSend ()
	{	
		string value = (input.text == "") ? "0" : input.text;

		net.RequestDataById ("users", value, DataCallBack);
		Debug.Log ("Click Send Button" + value);
	}

	public void OnCreate ()
	{	
		string userid = (id_input.text == "") ? "xx" : id_input.text;
		string username = (username_input.text == "") ? "xx" : username_input.text;
		string name = (name_input.text == "") ? "xx" : name_input.text;
		string position = (position_input.text == "") ? "xx" : position_input.text; 
		
		net.SaveUser ("newuser", userid, username, name, position, DataSaveCallBack);
		Debug.Log ("Click Save Button");

	}

	private void DataCallBack (JSONObject result)
	{	
		Debug.Log ("Result " + result.ToString ());
		id.text = "id " + result.GetField ("userid").ToString (); 
		name.text = "name " + result.GetField ("name").ToString ();
		username.text = "username " + result.GetField ("username").ToString ();
		position.text = "position " + result.GetField ("position").ToString ();
	}

	private void DataSaveCallBack (JSONObject result)
	{	
		Debug.Log ("Save Complete " + result.ToString ());

	}
}
