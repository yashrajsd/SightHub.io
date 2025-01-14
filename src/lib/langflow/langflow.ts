class LangflowClient {
  baseURL: string;
  applicationToken: string;

  constructor(baseURL: string, applicationToken: string) {
    this.baseURL = baseURL;
    this.applicationToken = applicationToken;
  }

  async post(
    endpoint: string,
    body: {
      input_value: string;
      input_type: string;
      output_type: string;
      tweaks: Record<string, any>;
    },
    headers: Record<string, string> = { "Content-Type": "application/json" }
  ): Promise<any> {
    headers["Authorization"] = `Bearer ${this.applicationToken}`;
    headers["Content-Type"] = "application/json";
    const url = `${this.baseURL}${endpoint}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
  
      let responseMessage: any;
      try {
        responseMessage = await response.json();
      } catch {
        throw new Error(`Invalid JSON response: ${await response.text()}`);
      }
  
      if (!response.ok) {
        throw new Error(
          `${response.status} ${response.statusText} - ${JSON.stringify(
            responseMessage
          )}`
        );
      }
      return responseMessage;
    } catch (error: any) {
      console.error("Request Error:", error.message);
      throw error;
    }
  }
  

  async initiateSession(
    flowId: string,
    langflowId: string,
    inputValue: string,
    inputType: string = "chat",
    outputType: string = "chat",
    stream: boolean = false,
    tweaks: Record<string, any> = {}
  ): Promise<any> {
    const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
    return this.post(endpoint, {
      input_value: inputValue,
      input_type: inputType,
      output_type: outputType,
      tweaks: tweaks,
    });
  }

  handleStream(
    streamUrl: string,
    onUpdate: (data: any) => void,
    onClose: (message: string) => void,
    onError: (error: any) => void
  ): EventSource {
    const eventSource = new EventSource(streamUrl);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onUpdate(data);
    };

    eventSource.onerror = (event) => {
      console.error("Stream Error:", event);
      onError(event);
      eventSource.close();
    };

    eventSource.addEventListener("close", () => {
      onClose("Stream closed");
      eventSource.close();
    });

    return eventSource;
  }

  async runFlow(
    flowIdOrName: string,
    langflowId: string,
    inputValue: string,
    inputType: string = "chat",
    outputType: string = "chat",
    tweaks: Record<string, any> = {},
    stream: boolean = false,
    onUpdate: (data: any) => void,
    onClose: (message: string) => void,
    onError: (error: any) => void
  ): Promise<any> {
    try {
      const initResponse = await this.initiateSession(
        flowIdOrName,
        langflowId,
        inputValue,
        inputType,
        outputType,
        stream,
        tweaks
      );

      if (
        stream &&
        initResponse?.outputs?.[0]?.outputs?.[0]?.artifacts?.stream_url
      ) {
        const streamUrl =
          initResponse.outputs[0].outputs[0].artifacts.stream_url;
        console.log(`Streaming from: ${streamUrl}`);
        this.handleStream(streamUrl, onUpdate, onClose, onError);
      }
      return initResponse;
    } catch (error: any) {
      console.error("Error running flow:", error.message);
      onError("Error initiating session");
    }
  }
}

export async function runAIWorkFlow(
  inputValue: string,
  inputType: string = "chat",
  outputType: string = "chat",
  stream: boolean = false
): Promise<string | void> {
  const flowIdOrName = "3ba27b19-c4b4-465d-bab0-91c263aab96f";
  const langflowId = "e134bff0-68df-4644-9f42-d149863edccf";
  const applicationToken =
    "AstraCS:DIcTvdQRzjKujtNbjNvbgROC:13bd868ddf75ab48ae65426f4868573fd539e0ae7d910ef8147bcf789e17b0d7";
  const langflowClient = new LangflowClient(
    "https://api.langflow.astra.datastax.com",
    applicationToken
  );

  try {
    const tweaks = {};

    const response = await langflowClient.runFlow(
      flowIdOrName,
      langflowId,
      inputValue,
      inputType,
      outputType,
      tweaks,
      stream,
      (data: any) => console.log("Received:", data.chunk), // onUpdate
      (message: any) => console.log("Stream Closed:", message), // onClose
      (error: any) => console.log("Stream Error:", error) // onError
    );

    if (!stream && response?.outputs) {
      const flowOutputs = response.outputs[0];
      const firstComponentOutputs = flowOutputs.outputs[0];
      const output = firstComponentOutputs.outputs?.message;

      return output?.message?.text || "No output message received.";
    }
  } catch (error: any) {
    console.error("Main Error:", error.message);
  }
}
