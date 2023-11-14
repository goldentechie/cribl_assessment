#include <napi.h>
#include <fstream>
#include <string>

class ReverseReader : public Napi::ObjectWrap<ReverseReader> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    ReverseReader(const Napi::CallbackInfo &info);

private:
    static Napi::FunctionReference constructor;

    Napi::Value ReadLine(const Napi::CallbackInfo &info);
    Napi::Value Close(const Napi::CallbackInfo &info);
    std::ifstream file;
};

Napi::FunctionReference ReverseReader::constructor;

Napi::Object ReverseReader::Init(Napi::Env env, Napi::Object exports) {
    Napi::Function func = DefineClass(env, "ReverseReader", {
        InstanceMethod("readLine", &ReverseReader::ReadLine),
        InstanceMethod("close", &ReverseReader::Close)
    });

    constructor = Napi::Persistent(func);
    constructor.SuppressDestruct();

    exports.Set("ReverseReader", func);
    return exports;
}

ReverseReader::ReverseReader(const Napi::CallbackInfo &info) : Napi::ObjectWrap<ReverseReader>(info) {
    std::string filename = info[0].As<Napi::String>().Utf8Value();
    file.open(filename, std::ios::binary);
    file.seekg(-1, file.end);

    if (!file.is_open()) {
        Napi::Error::New(info.Env(), "Error opening file: " + filename).ThrowAsJavaScriptException();
    }
}

Napi::Value ReverseReader::ReadLine(const Napi::CallbackInfo &info) {
    if (!file.is_open() || file.tellg() < 0) {
        return info.Env().Undefined();
    }

    std::string line="";
    char ch;
    do {
        file.get(ch);
        line = ch + line;
        file.seekg(-2, std::ios::cur);
    } while (ch != '\n' && ch != '\r' && file.tellg() >= 0);
    file.seekg(-1, std::ios::cur);
    return Napi::String::New(info.Env(), (line.data()[0]=='\n' || line.data()[0]=='\r')?line.data()+1:line.data());
}


Napi::Value ReverseReader::Close(const Napi::CallbackInfo &info) {
    if (!file.is_open()) {
        return info.Env().Undefined();
    }
    file.close();
    return Napi::String::New(info.Env(), "true");
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    return ReverseReader::Init(env, exports);
}

NODE_API_MODULE(reverse_reader, Init);
