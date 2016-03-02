using UnityEngine;
using System.Collections;


public class NetworkManager : MonoBehaviour
{
	public delegate void RequestCallBack (JSONObject result);


	public RequestCallBack callback;

	public string url = "localhost:3000/";

	public void RequestDataById (string path, string id, RequestCallBack callback)
	{
		this.callback = callback;

		WWWForm form = new WWWForm ();

		form.AddField ("id", id);
		WWW www = new WWW (url + path, form);
		Debug.Log ("URL " + www.url);

		StartCoroutine (WaitForRequest (www));
	}

	public void SaveUser (string path, string userid, string username, string name, string position, RequestCallBack callback)
	{
		this.callback = callback;

		WWWForm form = new WWWForm ();

		form.AddField ("userid", userid);
		form.AddField ("username", username);
		form.AddField ("name", name);
		form.AddField ("position", position);

		WWW www = new WWW (url + path, form);
		Debug.Log ("URL " + www.url);

		StartCoroutine (WaitForRequest (www));
	}

	IEnumerator WaitForRequest (WWW www)
	{
		yield return www;

		if (www.error == null) {
			this.callback (new JSONObject (www.text));
		} else {
			this.callback (new JSONObject (www.error)); 
		}
	}
}
