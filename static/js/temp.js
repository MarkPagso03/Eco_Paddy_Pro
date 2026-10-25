function compute(){
           // Gather all input values in one array, keeping the empty strings for gaps
        input_value = [
            (document.querySelector("#seed_in").value || 0),
            '',
            (document.querySelector("#herbicide").value || 0),
            (document.querySelector("#insecticide").value || 0),
            '', '',
            (document.querySelector("#nitrogen").value || 0),
            (document.querySelector("#phosphorus").value || 0),
            (document.querySelector("#potassium").value || 0),
            (document.querySelector("#d_emission_i").value || 0),
            (document.querySelector("#d_emission_c").value || 0),
            (document.querySelector("#i_emission").value || 0),
            (document.querySelector("#f_manure").value || 0),
            (document.querySelector("#compost").value || 0),
            '', '', '',
            (document.querySelector("#plow_m_hour").value || 0),
            (document.querySelector("#plow_f_consumption").value || 0),
            '',
            (document.querySelector("#harrow_m_hour").value || 0),
            (document.querySelector("#harrow_f_consumption").value || 0),
            '',
            (document.querySelector("#level_m_hour").value || 0),
            (document.querySelector("#level_f_consumption").value || 0),
            (document.querySelector("#m_machinery").value || 0),
            '',
            (document.querySelector("#trans_m_hour").value || 0),
            (document.querySelector("#trans_f_consumption").value || 0),
            '', '',
            (document.querySelector("#harvest_m_hour").value || 0),
            (document.querySelector("#harvest_f_consumption").value || 0),
            '', '',
            (document.querySelector("#pump_m_hour").value || 0),
            (document.querySelector("#pump_f_consumption").value || 0),
            '', '',
            (document.querySelector("#cult_wo_straw").value || 0),
            (document.querySelector("#cult_w_straw").value || 0),
            '', '',
            (document.querySelector("#s_burn").value || 0)
        ];

        // Extract h_area separately as it's used in multiple calculations
        // Parse h_area separately
        const h_area = (parseFloat(document.querySelector("#h_area").value) || 0); // Default to 0 if invalid

        // Perform calculations using the values from input_value array
        const seed_in = roundToDecimals((parseFloat(input_value[0]) || 0) * h_area * 1.12);
        const herbicide = roundToDecimals((parseFloat(input_value[2]) || 0) * 6.3);
        const insecticide = roundToDecimals((parseFloat(input_value[3]) || 0) * 5.1);
        const pesticide = roundToDecimals((herbicide + insecticide) * h_area);

        const nitrogen = roundToDecimals((parseFloat(input_value[6]) || 0) * 1.3);
        const phosphorus = roundToDecimals((parseFloat(input_value[7]) || 0) * 0.2);
        const potassium = roundToDecimals((parseFloat(input_value[8]) || 0) * 0.2);
        const d_emission_i = roundToDecimals((parseFloat(input_value[9]) || 0) * 2.34);
        const d_emission_c = roundToDecimals((parseFloat(input_value[10]) || 0) * 1.41);
        const i_emission = roundToDecimals((parseFloat(input_value[11]) || 0) * 5.68);
        const f_manure = roundToDecimals((parseFloat(input_value[12]) || 0) * 0.21);
        const compost = roundToDecimals((parseFloat(input_value[13]) || 0) * 0.17);
        const fertilizer = roundToDecimals((nitrogen + phosphorus + potassium + d_emission_i + d_emission_c +
                            i_emission + f_manure + compost) * h_area);

        const plow_m_hour = roundToDecimals((parseFloat(input_value[17]) || 0) * 62.7 * 0.07);
        const plow_f_consumption = roundToDecimals((parseFloat(input_value[18]) || 0) * 2.76);
        const harrow_m_hour = roundToDecimals((parseFloat(input_value[20]) || 0) * 62.7 * 0.07);
        const harrow_f_consumption = roundToDecimals((parseFloat(input_value[21]) || 0) * 2.76);
        const level_m_hour = roundToDecimals((parseFloat(input_value[23]) || 0) * 62.7 * 0.07);
        const level_f_consumption = roundToDecimals((parseFloat(input_value[24]) || 0) * 2.76);
        const m_machinery = roundToDecimals((parseFloat(input_value[25]) || 0) * 12.8);
        const trans_m_hour = roundToDecimals((parseFloat(input_value[27]) || 0) * 62.7 * 0.07);
        const trans_f_consumption = roundToDecimals((parseFloat(input_value[28]) || 0) * 2.76);

        const seedbed = roundToDecimals((plow_f_consumption + plow_m_hour + harrow_f_consumption + harrow_m_hour +
                         level_f_consumption + level_m_hour + trans_f_consumption + trans_m_hour +
                         m_machinery) * h_area);

        const harvest_m_hour = roundToDecimals((parseFloat(input_value[31]) || 0) * 62.7 * 0.07);
        const harvest_f_consumption = roundToDecimals((parseFloat(input_value[32]) || 0) * 2.76);
        const harvest = roundToDecimals((harvest_f_consumption + harvest_m_hour) * h_area);

        const pump_m_hour = roundToDecimals((parseFloat(input_value[35]) || 0) * 62.7 * 0.07);
        const pump_f_consumption = roundToDecimals((parseFloat(input_value[36]) || 0) * 2.76);
        const pump = roundToDecimals((pump_f_consumption + pump_m_hour) * h_area);

        // Handle irrigation
        let cult_wo_straw, cult_w_straw;
        if (document.querySelector("#irrigated").checked) {
            cult_wo_straw = roundToDecimals((parseFloat(input_value[39]) || 0) * 1.3);
            cult_w_straw = roundToDecimals((parseFloat(input_value[40]) || 0) * 2.08);
        } else {
            cult_wo_straw = roundToDecimals((parseFloat(input_value[39]) || 0) * 0.36);
            cult_w_straw = roundToDecimals((parseFloat(input_value[40]) || 0) * 0.51);
        }

        const s_emission_ch4 = roundToDecimals(cult_w_straw + cult_wo_straw);
        const s_emission_co2 = roundToDecimals(s_emission_ch4 * 34.16 * h_area);

        // s_burn value calculation
        const s_burn = roundToDecimals((parseFloat(input_value[43]) || 0) * 2.74 * 34.16 * 0.8 * 0.95 * h_area);

        // Total emissions and values
        const total = roundToDecimals(seed_in + pesticide + fertilizer + seedbed + harvest + pump + s_emission_co2 + s_burn);

            data_ghg = [seed_in,'', herbicide, insecticide, pesticide,'', nitrogen, phosphorus,
                potassium, d_emission_i, d_emission_c, i_emission, f_manure, compost, fertilizer, '', '',
                plow_m_hour, plow_f_consumption, '', harrow_m_hour, harrow_f_consumption, '', level_m_hour,
                level_f_consumption, m_machinery, '', trans_m_hour, trans_f_consumption, seedbed, '',
                harvest_m_hour, harvest_f_consumption, harvest, '' , pump_m_hour, pump_f_consumption, pump, '',
                cult_wo_straw, cult_w_straw, s_emission_ch4, s_emission_co2, s_burn, total];

            const tableBody = document.querySelector("#table tbody");

            for (let i = 0; i < input_value.length; i++) {
                let row = tableBody.rows[i]; // Get the current row
                row.cells[1].textContent = input_value[i]; // Update fourth column (GHG (kg CO2 eq/ha))
            }

            for (let i = 0; i < data_ghg.length; i++) {
                let row = tableBody.rows[i]; // Get the current row
                row.cells[3].textContent = data_ghg[i]; // Update fourth column (GHG (kg CO2 eq/ha))
            }

            // Ensure jsPDF is correctly loaded
            const { jsPDF } = window.jspdf || {};

            // Chart creation
            const ctx = document.getElementById('chart').getContext('2d');
            const window_width = window.innerWidth;

            if (myChart) {
                myChart.destroy();
            }

            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Seed', 'Pesticide', 'Fertilizer', 'Seedbed and Land Preparation', 'Harvesting and Threshing', 'Pump (Irrigation)', 'Soil Emission', 'Straw Burning'],
                    datasets: [{
                        label: 'GHG Data',
                        data: [seed_in, pesticide, fertilizer, seedbed, harvest, pump, s_emission_co2, s_burn],
                        backgroundColor: 'rgb(74, 191, 103, 0.2)',
                        borderColor: 'rgb(74, 191, 103, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true, // Ensures responsiveness
                    maintainAspectRatio: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { // Show every label, adjust as needed for your data
                                font: {
                                    size: window_width > 600 ? 12 : 8, // Adjust the size as needed
                                },
                                color: 'rgb(0,0,0)'
                            }
                        },
                        x: {
                            autoSkip: false,
                            ticks: {
                                stepSize: 1, // Show every label, adjust as needed for your data
                                font: {
                                    size: window_width > 600 ? 12 : 8, // Adjust the size as needed
                                },
                                color: 'rgb(0,0,0)'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                    size: window_width > 600 ? 13 : 9// Set the size of the legend labels (in pixels)
                                },
                                boxWidth: 0,
                                boxHeight: 0,
                            }
                        }
                    }
                }
            });

            window.scrollTo(0, document.body.scrollHeight);
            close();
        }