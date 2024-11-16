
        const radioButtons = document.querySelectorAll('input[name="com_type"]');

        radioButtons.forEach(radio => {
            radio.addEventListener('change', () => {
                if (document.querySelector("#rainfed").checked){
                    document.querySelector('label[for="cult_wo_straw"]').innerHTML = "a.Rainfed rice cultivation<br>without straw";
                    document.querySelector('label[for="cult_w_straw"]').innerHTML = "b.Rainfed rice cultivation<br>with straw";
                }else{
                    document.querySelector('label[for="cult_wo_straw"]').innerHTML = "a.Irrigation rice cultivation<br>without straw";
                    document.querySelector('label[for="cult_w_straw').innerHTML = "b.Irrigation rice cultivation<br>with straw";
                }
            });
        });

        window.addEventListener('DOMContentLoaded',
            function() {
                if (window.innerWidth < 600) { // must remove true
                    document.querySelector('#title').remove();
                    console.log('Eleme');
                }
            });

        function togglePage() {

            // Select both pages using their data attributes
            const page1 = document.querySelector('[data-page="page1"]');
            const page2 = document.querySelector('[data-page="page2"]');

            // Toggle the 'active' class between the pages
            if (page1.classList.contains('active')) { console.log("pagetoggled");
                page1.classList.remove('active');
                page2.classList.add('active');
                document.querySelector("#header_compute").textContent = 'Home';
                window.scrollTo(0, 0);
            } else {
                page2.classList.remove('active');
                page1.classList.add('active');
                document.querySelector("#header_compute").textContent = 'Calculate';
                window.scrollTo(0, 0);
            }
        }


         const inputFields = document.querySelectorAll(".input-field");

        // Iterate over the NodeList and add event listeners
        inputFields.forEach(function(inputField, index) {
            inputField.addEventListener("keydown", function(event) {
                if (event.key === "Enter") {
                    event.preventDefault(); // Prevent default action (e.g., form submission)

                    // Focus the next input field if it exists
                    if (index < inputFields.length - 1) {
                        inputFields[index + 1].focus(); // Focus the next input
                    } else if(index == inputFields.length - 1) {
                        // this line must prompt the user if he wants to compute or submit
                    }
                }
            });
        });

        document.querySelector("#compute").addEventListener("click", function() {
            document.querySelector("#compute_prompt").style.display = "flex"; // Show the alert
            document.querySelector(".input_container").classList.add('disable');
            document.querySelector("header").classList.add('disable');
            document.querySelector("footer").classList.add('disable');
            document.querySelector("body").style.overflow = "hidden";
            console.log("compute clicked");
        });

        function close() {
            document.querySelector("#compute_prompt").style.display = "none"; // Show the alert
            document.querySelector(".input_container").classList.remove('disable');
            document.querySelector("header").classList.remove('disable');
            document.querySelector("footer").classList.remove('disable');
            document.querySelector("body").style.overflow = "";
            console.log("compute clicked");
        }

        function roundToDecimals(num) {
            const factor = Math.pow(10, 4);
            return Math.round(num * factor) / factor;
        }

        let myChart;
        const row_name = [
                    '1. Seed Inut',
                    '2. Pesticide',
                    '        Herbicide',
                    '        Insecticide',
                    '        Total',
                    '3. Fertilizer',
                    '        Nitrogen (production)',
                    '        Phosphorus (production)',
                    '        Potassium (production)',
                    '        Direct emission from N (intermittent drainage)',
                    '        Direct emission from N (continuous flooding)',
                    '        Indirect emission from N',
                    '        Farmyard manure',
                    '        Compost',
                    '        Total',
                    '4. Seedbed and Land Preparation',
                    '        a. Plowing',
                    '                Machine Emission Factor',
                    '                Fuel Consumption',
                    '        b. Harrowing',
                    '                Machine hours',
                    '                Fuel Consumption',
                    '        c. Leveling',
                    '                Machine Emission Factor',
                    '                Fuel Consumption',
                    '        d. Manufacture of Machinery\n           (hand tractor and axial flow thresher)',
                    '        e. Mechanical Transplanter',
                    '                Machine hours',
                    '                Fuel Consumption',
                    '        Total',
                    '5. Harvesting and Threshing',
                    '        Machine Emission Factor',
                    '        Fuel Consumption',
                    '        Total',
                    '6. Pump (Irrigation)',
                    '        Machine hours',
                    '        Fuel Consumption',
                    '        Total',
                    '7. Soil Emission',
                    '        a. Irrigated rice cultivation w/out straw',
                    '        b. Irrigated rice cultivation w/straw',
                    '        Total CH3',
                    '        Total CO2 equivalence',
                    '8. Straw Burning',
                    '        Total CO2 Emission'
                ];
        let input_value = [];
        const units = ['kg/ha', '', 'kg/ha', 'kg/ha', '', '', 'kg/ha', 'kg/ha', 'kg/ha', 'kg/ha', 'kg/ha', 'kg/ha', 'kg/ha', 'kg/ha', '', '', '', 'hr/ha', 'L/ha','', 'hr/ha', 'L/ha','', 'hr/ha', 'L/ha', 'kg','', 'hr/ha', 'L/ha', '','', 'hr/ha', 'L/ha', '', '', 'hr/ha', 'L/ha','','', 'days', 'days', '', '', 'kg/ha', ''];
        let data_ghg = [];


        document.querySelector("#cancel_compute").addEventListener("click", close)
        document.querySelector("#close_prompt").addEventListener("click", close);

        function compute(){
           // Gather all input values in one array, keeping the empty strings for gaps
        input_value = [
            (document.querySelector("#seed_in").value ),
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
        console.log(input_value);

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

        // Log final calculated values (optional)
        console.log({
            seed_in, pesticide, fertilizer, seedbed, harvest, pump, s_emission_co2, s_burn, total
        });




            data_ghg = [seed_in,'', herbicide, insecticide, pesticide,'', nitrogen, phosphorus,
                potassium, d_emission_i, d_emission_c, i_emission, f_manure, compost, fertilizer, '', '',
                plow_m_hour, plow_f_consumption, '', harrow_m_hour, harrow_f_consumption, '', level_m_hour,
                level_f_consumption, m_machinery, '', trans_m_hour, trans_f_consumption, seedbed, '',
                harvest_m_hour, harvest_f_consumption, harvest, '' , pump_m_hour, pump_f_consumption, pump, '',
                cult_wo_straw, cult_w_straw, s_emission_ch4, s_emission_co2, s_burn, total];
        console.log(data_ghg);
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
                                }
                            }
                        },
                        x: {
                            autoSkip: false,
                            ticks: {
                                stepSize: 1, // Show every label, adjust as needed for your data
                                font: {
                                    size: window_width > 600 ? 12 : 8, // Adjust the size as needed
                                }
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


            close();
            console.log(total);

        }

        compute();

        document.querySelector("#compute_compute").addEventListener('click', compute);

        document.querySelector("#download_pdf").addEventListener('click', function() {
                // Convert the chart to a base64 image
                const canvas = document.getElementById('chart');
                const imgData = canvas.toDataURL('image/png');

                const table_data = row_name.map((item, index) => [
                    item,
                    input_value[index],
                    units[index],
                    data_ghg[index] // This should be included as part of the map callback
                ]);

                const currentDate = new Date();
                const isoDateTime = currentDate.toISOString();

                const { jsPDF } = window.jspdf || {};

                // Create and save the PDF with jsPDF
                if (jsPDF) {
                    const doc = new jsPDF();
                    doc.autoTable({
                        head: [['AGRICULTURAL INPUTS AND RESOURCES','QUANTITY','UNIT','GHG\n(kg CO2 eq/ha)']],
                        body: table_data,
                        startY: 10,      // Optional: top margin
                        styles:  {
                            fillColor: [255, 255, 255], // Background color for body
                            textColor: [0, 0, 0],       // Text color for body
                            fontSize: 12,               // Font size for body text
                            valign: 'middle',           // Vertical alignment for body cells
                          },
                        headStyles: {
                            fillColor: [255, 255, 255],   // Background color for header
                            textColor: [0, 0, 0], // Text color for header
                            halign: 'center',
                            fontStyle: 'bold',          // Font style for header
                            valign: 'middle',           // Vertical alignment for header
                          },
                        columnStyles: {
                            0: { cellWidth: '40%', halign: 'left' },  // Left alignment for column 0
                            1: { cellWidth: '20%',  halign: 'center' },  // Left alignment for column 1
                            2: { cellWidth: '20%',  halign: 'center' },   // Center alignment for column 2
                            3: { cellWidth: '20%',  halign: 'center' }
                        },

                        didDrawPage: function (data) {
                            // Add footer with page number
                            const pageHeight = doc.internal.pageSize.height;
                            const footerY = pageHeight - 10;
                            doc.setFontSize(10);
                            doc.text("Page " + doc.internal.getNumberOfPages(), 180, footerY);  // Page number
                            doc.text("ECO Paddy Pro | " +isoDateTime , 10, footerY);  // Footer text
                        }
                    });

                    const tableHeight = doc.lastAutoTable.finalY;  // This returns the bottom Y position of the last table row

                    // Now, you can add the image below the table
                    doc.addImage(imgData, 'PNG', 10, tableHeight + 10, 180, 100); // Position the image after the table with some margin


                    doc.save('C02_emission.pdf');
                } else {
                    console.error('jsPDF library not loaded.');
                }
        });

