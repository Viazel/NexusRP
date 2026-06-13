use tauri::{AppHandle, Emitter, Manager, WebviewUrl, WebviewWindowBuilder};

const CLIENT_ID: &str = "1ce6e35a-126f-48fd-97fb-54d143ac6d45";
const REDIRECT_URI: &str = "https://login.live.com/oauth20_desktop.srf";

#[tauri::command]
fn start_microsoft_login(app: AppHandle) -> Result<(), String> {
    let auth_url = format!(
        "https://login.live.com/oauth20_authorize.srf?client_id={}&response_type=code&redirect_uri={}&scope=XboxLive.signin%20offline_access",
        CLIENT_ID, REDIRECT_URI
    );

    let app_clone = app.clone();

    let _window = WebviewWindowBuilder::new(
        &app,
        "microsoft-login",
        WebviewUrl::External(auth_url.parse().unwrap()),
    )
    .title("Connexion Microsoft")
    .inner_size(500.0, 600.0)
    .resizable(false)
    .on_navigation(move |url| {
        if url.as_str().starts_with(REDIRECT_URI) {
            let mut auth_code = None;
            for (key, value) in url.query_pairs() {
                if key == "code" {
                    auth_code = Some(value.into_owned());
                    break;
                }
            }

            if let Some(code) = auth_code {
                println!("Code d'autorisation récupéré en Rust : {}", code);

                let _ = app_clone.emit("microsoft-code", code);

                if let Some(window) = app_clone.get_webview_window("microsoft-login") {
                    let _ = window.close();
                }
            }
            return false;
        }
        true
    })
    .build()
    .map_err(|e| e.to_string())?;

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![start_microsoft_login])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
