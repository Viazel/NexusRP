// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn open_microsoft_login() {
    println!("Open Microsoft")
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![open_microsoft_login])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
