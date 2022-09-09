import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useChec } from "../contexts/ChecContext";
import { commerce } from "../lib/commerce";
import "../styles/AddressForm.css";
import { FormInput } from "./index";

export default function AddressForm({ next }) {
  const [shippingCountries, setshippingCountries] = useState({});
  const [shippingCountry, setshippingCountry] = useState("");
  const [shippingSubdivisions, setshippingSubdivisions] = useState({});
  const [shippingSubdivision, setshippingSubdivision] = useState("");
  const [shippingOptions, setshippingOptions] = useState([]);
  const [shippingOption, setshippingOption] = useState("");

  const { checkoutToken } = useChec();

  const methods = useForm();

  useEffect(() => {
    async function fetchShippingCountries(checkoutTokenId) {
      const countries = await commerce.services.localeListShippingCountries(
        checkoutTokenId
      );
      setshippingCountries(countries.countries);
      setshippingCountry(Object.keys(shippingCountries)[0]);
    }
    fetchShippingCountries(checkoutToken.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkoutToken?.id]);

  useEffect(() => {
    async function fetchSubdivisions(countryCode) {
      const subdivisions = await commerce.services.localeListSubdivisions(
        countryCode
      );
      setshippingSubdivisions(subdivisions.subdivisions);
      setshippingSubdivision(Object.keys(shippingSubdivisions)[0]);
    }
    shippingCountry && fetchSubdivisions(shippingCountry);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingCountry]);

  useEffect(() => {
    async function fetchShippingOptions(
      checkoutTokenId,
      country,
      stateProvince = null
    ) {
      const options = await commerce.checkout.getShippingOptions(
        checkoutTokenId,
        {
          country: country,
          region: stateProvince,
        }
      );
      const shippingOption = options[0] || null;
      setshippingOptions(options);
      setshippingOption(shippingOption);
    }

    fetchShippingOptions(
      checkoutToken?.id,
      shippingCountry,
      shippingSubdivision
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingSubdivision]);

  return (
    <>
      <h6>Shiping Address</h6>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <>
            {/* div className="textField" */}
            <FormInput name="firstname" label="First Name" />
            <FormInput name="lastname" label="Last Name" />
            <FormInput name="address" label="Address" />
            <FormInput name="email" label="Email" />
            <FormInput name="city" label="City" />
            <FormInput name="zip" label="ZIP / Postal Code" />
            <div className="selectField">
              <label>Shipping Country</label>
              {"    "}
              <select
                name=""
                value={shippingCountry}
                onChange={(e) => setshippingCountry(e.target.value)}
              >
                <option value="select">select...</option>
                {Object.keys(shippingCountries).map((country) => (
                  <option key={country} value={country}>
                    {shippingCountries[country]}
                  </option>
                ))}
              </select>
            </div>
            <br />
            <div className="selectField">
              <label>Shipping Subdivition</label>
              {"    "}
              <select
                name=""
                value={shippingSubdivision}
                onChange={(e) => setshippingSubdivision(e.target.value)}
              >
                <option value="select">select...</option>
                {Object.keys(shippingSubdivisions).map((Subdivision) => (
                  <option key={Subdivision} value={Subdivision}>
                    {shippingSubdivisions[Subdivision]}
                  </option>
                ))}
              </select>
            </div>
            <br />
            <div className="selectField">
              <label>Shiping Options</label>
              <select
                name="shippingOption"
                value={shippingOption?.id}
                onChange={(e) => setshippingOption(e.target.value)}
              >
                <option value="select">select...</option>
                {shippingOptions.map((method) => {
                  return (
                    <option key={method.id} value={method.id}>
                      {`${method.description} - $${method.price.formatted_with_code}`}
                    </option>
                  );
                })}
                ;
              </select>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "1rem",
              }}
            >
              <Link to="/cart">
                <button className="btn btn-success">Go To Back</button>
              </Link>

              <button type="submit" className="btn btn-success">
                Next
              </button>
            </div>
          </>
        </form>
      </FormProvider>
    </>
  );
}
