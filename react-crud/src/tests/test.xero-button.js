import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import XeroButton from "./XeroButton";

jest.mock("axios");

describe("XeroButton", () => {
  it("should make a POST request to upload data to Xero when clicked", async () => {
    axios.post.mockResolvedValue({ data: "Successfully uploaded to Xero!" });

    const { getByText } = render(<XeroButton />);

    const uploadButton = getByText("Upload to Xero");
    fireEvent.click(uploadButton);

    expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/upload");
    expect(uploadButton).toBeDisabled();

    await waitFor(() => expect(uploadButton).not.toBeDisabled());
    expect(axios.post).toHaveBeenCalledTimes(1);

    const consoleSpy = jest.spyOn(console, "log");
    expect(consoleSpy).not.toHaveBeenCalled();

    await waitFor(() =>
      expect(consoleSpy).toHaveBeenCalledWith("Successfully uploaded to Xero!")
    );
  });

  it("should log an error if the request to Xero fails", async () => {
    axios.post.mockRejectedValue(new Error("Request failed"));

    const { getByText } = render(<XeroButton />);

    const uploadButton = getByText("Upload to Xero");
    fireEvent.click(uploadButton);

    expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/upload");
    expect(uploadButton).toBeDisabled();

    await waitFor(() => expect(uploadButton).not.toBeDisabled());
    expect(axios.post).toHaveBeenCalledTimes(1);

    const consoleErrorSpy = jest.spyOn(console, "error");
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error sending emailError: Request failed"
    );
  });
});
