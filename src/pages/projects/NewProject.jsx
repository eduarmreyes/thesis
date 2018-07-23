import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/es";
import $ from "jquery";
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import Select from "react-select";
import CreatableSelect from "react-select/lib/Creatable";
import { DatetimePickerTrigger } from "rc-datetime-picker";
import LaddaButton from "react-ladda";

import "bootstrap/dist/css/bootstrap.min.css";
import "rc-datetime-picker/dist/picker.css";

import Backend from "components/Layouts/Backend";

const HUMAN_RESOURCES_FUNCTION = [
  {
    id: 1,
    label: "Perfilador",
    value: "Perfilador"
  },
  {
    id: 2,
    label: "Coordinador",
    value: "Coordinador"
  },
  {
    id: 3,
    label: "Ejecutor",
    value: "Ejecutor"
  }
];

const PROJECT_RESOURCE_TYPE = [
  {
    id: 1,
    label: "Recursos Humanos",
    value: "Recursos Humanos"
  },
  {
    id: 2,
    label: "Otros Recursos",
    value: "Otros Recursos"
  }
];

const UNIT_MEASUREMENT = [
  {
    id: 1,
    label: "Personas",
    value: "Personas"
  },
  {
    id: 2,
    label: "Niños",
    value: "Niños"
  },
  {
    id: 3,
    label: "Niñas",
    value: "Niñas"
  },
  {
    id: 4,
    label: "Niños y Niñas",
    value: "Niños y Niñas"
  },
  {
    id: 5,
    label: "Familias",
    value: "Familias"
  },
  {
    id: 6,
    label: "Centros Educativos",
    value: "Centros Educativos"
  },
  {
    id: 7,
    label: "Mujeres",
    value: "Mujeres"
  }
];

const UNIT_MEASUREMENT_OBJECTIVE = [
  {
    id: 1,
    label: "Personas",
    value: "Personas"
  },
  {
    id: 2,
    label: "Niños",
    value: "Niños"
  },
  {
    id: 3,
    label: "Niñas",
    value: "Niñas"
  },
  {
    id: 4,
    label: "Niños y Niñas",
    value: "Niños y Niñas"
  },
  {
    id: 5,
    label: "Familias",
    value: "Familias"
  },
  {
    id: 6,
    label: "Centros Educativos",
    value: "Centros Educativos"
  },
  {
    id: 7,
    label: "Mujeres",
    value: "Mujeres"
  },
  {
    id: 8,
    label: "Programa",
    value: "Programa"
  },
  {
    id: 9,
    label: "Comunidad",
    value: "Comunidad"
  },
  {
    id: 10,
    label: "Personas Mayores",
    value: "Personas Mayores"
  },
  {
    id: 11,
    label: "Centros de Desarrollo Infantil",
    value: "Centros de Desarrollo Infantil"
  },
  {
    id: 12,
    label: "Educadores",
    value: "Educadores"
  },
  {
    id: 13,
    label: "Pacientes",
    value: "Pacientes"
  }
];

const UNIT_MEASUREMENT_RESULTS = [
  {
    id: 1,
    label: "Personas",
    value: "Personas"
  },
  {
    id: 2,
    label: "Niños",
    value: "Niños"
  },
  {
    id: 3,
    label: "Niñas",
    value: "Niñas"
  },
  {
    id: 4,
    label: "Niños y Niñas",
    value: "Niños y Niñas"
  },
  {
    id: 5,
    label: "Familias",
    value: "Familias"
  },
  {
    id: 6,
    label: "Centros Educativos",
    value: "Centros Educativos"
  },
  {
    id: 7,
    label: "Mujeres",
    value: "Mujeres"
  },
  {
    id: 8,
    label: "Programa",
    value: "Programa"
  },
  {
    id: 9,
    label: "Comunidad",
    value: "Comunidad"
  },
  {
    id: 10,
    label: "Personas Mayores",
    value: "Personas Mayores"
  },
  {
    id: 11,
    label: "Centros de Desarrollo Infantil",
    value: "Centros de Desarrollo Infantil"
  },
  {
    id: 12,
    label: "Educadores",
    value: "Educadores"
  },
  {
    id: 13,
    label: "Pacientes",
    value: "Pacientes"
  },
  {
    id: 14,
    label: "Conocimientos",
    value: "Conocimientos"
  },
  {
    id: 15,
    label: "Habilidades",
    value: "Habilidades"
  },
  {
    id: 16,
    label: "Prácticas",
    value: "Prácticas"
  },
  {
    id: 17,
    label: "Aptitudes",
    value: "Aptitudes"
  }
];

const UNIT_MEASUREMENT_HUMAN_RESOURCES = [
  {
    id: 1,
    label: "Personas",
    value: "Personas"
  },
  {
    id: 2,
    label: "Niños",
    value: "Niños"
  },
  {
    id: 3,
    label: "Niñas",
    value: "Niñas"
  },
  {
    id: 4,
    label: "Niños y Niñas",
    value: "Niños y Niñas"
  },
  {
    id: 5,
    label: "Familias",
    value: "Familias"
  },
  {
    id: 6,
    label: "Centros Educativos",
    value: "Centros Educativos"
  },
  {
    id: 7,
    label: "Mujeres",
    value: "Mujeres"
  },
  {
    id: 8,
    label: "Programa",
    value: "Programa"
  },
  {
    id: 9,
    label: "Comunidad",
    value: "Comunidad"
  },
  {
    id: 10,
    label: "Personas Mayores",
    value: "Personas Mayores"
  },
  {
    id: 11,
    label: "Centros de Desarrollo Infantil",
    value: "Centros de Desarrollo Infantil"
  },
  {
    id: 12,
    label: "Educadores",
    value: "Educadores"
  },
  {
    id: 13,
    label: "Pacientes",
    value: "Pacientes"
  }
];

const HUMAN_RESOURCES = [
  {
    id: 1,
    label: "Estudiantes",
    value: "Estudiantes"
  },
  {
    id: 2,
    label: "Personal Administrativo",
    value: "Personal Administrativo"
  },
  {
    id: 3,
    label: "Personal de Mantenimiento",
    value: "Personal de Mantenimiento"
  },
  {
    id: 4,
    label: "Personal de Docente",
    value: "Personal de Docente"
  }
];

const RESOURCES = [
  {
    id: 1,
    label: "Estudiantes",
    value: "Estudiantes"
  },
  {
    id: 2,
    label: "Material Didáctico",
    value: "Material Didáctico"
  },
  {
    id: 3,
    label: "Personal Administrativo",
    value: "Personal Administrativo"
  },
  {
    id: 4,
    label: "Papel Bond",
    value: "Papel Bond"
  },
  {
    id: 5,
    label: "Aulas Clase",
    value: "Aulas Clase"
  },
  {
    id: 6,
    label: "Centros Educativos",
    value: "Centros Educativos"
  },
  {
    id: 7,
    label: "Personal de Mantenimiento",
    value: "Personal de Mantenimiento"
  },
  {
    id: 8,
    label: "Horas",
    value: "Horas"
  }
];

class NewProjectUser extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.onToggleResultsArea(true);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return <h1>User</h1>;
  }
}

class NewProjectAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logframes: [],
      project_logframes: [],
      project_logframes_labels: [],
      // General Objective State
      project_general_objective: "",

      // Activities State
      activities: [],
      project_resources: [],
      project_resources_table: [],
      project_resources_labels: [],
      project_activity_name: "",
      total: 0,
      RESOURCES_OPTIONS: [
        {
          label: "Resource One",
          value: "Resource One"
        },
        {
          label: "Resource Two",
          value: "Resource Two"
        },
        {
          label: "Resource Three",
          value: "Resource Three"
        }
      ],
      project_general_objective_kpi_date: moment(),
      project_specific_objective_kpi_date: moment(),
      project_result_kpi_date: moment(),
      project_activity_start_date: moment(),
      project_activity_end_date: moment(),
      project_start_date: moment(),
      project_end_date: moment(),
      showLogframe: false,
      showCalendar: false,
      showSpecificObjectiveArea: false,
      project_general_objective_error_message: "",
      project_specific_objective_error_message: "",
      project_logframe_id: 0,

      // Results
      showResultsArea: false,
      project_results: [],
      project_results_for_activities: [],

      // Activities
      showActivitiesArea: false,
      project_activities: [],
      project_activity_results_options: [
        {
          id: 1,
          label: "Result One",
          value: "Result One"
        },
        {
          id: 2,
          label: "Result Two",
          value: "Result Two"
        },
        {
          id: 3,
          label: "Result Three",
          value: "Result Three"
        }
      ],
      project_activity_type_of_resource_options: [],

      loading_project_general_objective: false,
      disabled_project_general_objective: false,

      loading_project_specific_objective: false,
      disabled_project_specific_objective: false,

      showResourcesByActivitiesArea: false,

      loading_project_name: false
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeSelection = this.onChangeSelection.bind(this);
    this.onChangeSpecificObjectiveSelection = this.onChangeSpecificObjectiveSelection.bind(
      this
    );
    this.onSelectProjectGeneralObjectiveKPIDate = this.onSelectProjectGeneralObjectiveKPIDate.bind(
      this
    );
    this.onSelectProjectSpecificObjectiveKPIDate = this.onSelectProjectSpecificObjectiveKPIDate.bind(
      this
    );
    this.onSelectProjectResultKPIDate = this.onSelectProjectResultKPIDate.bind(
      this
    );
    this.onSelectProjectActivityStartDate = this.onSelectProjectActivityStartDate.bind(
      this
    );
    this.onSelectProjectActivityEndDate = this.onSelectProjectActivityEndDate.bind(
      this
    );
    this.onSelectProjectStartDate = this.onSelectProjectStartDate.bind(this);
    this.onSelectProjectEndDate = this.onSelectProjectEndDate.bind(this);
    this.onToggleLogframe = this.onToggleLogframe.bind(this);
    this.onToggleCalendar = this.onToggleCalendar.bind(this);
    this.onToggleSpecificObjectiveArea = this.onToggleSpecificObjectiveArea.bind(
      this
    );

    this.onSubmitProjectName = this.onSubmitProjectName.bind(this);

    this.onSubmitGeneralObjective = this.onSubmitGeneralObjective.bind(this);
    this.updateGeneralObjectiveErrorMessage = this.updateGeneralObjectiveErrorMessage.bind(
      this
    );
    this.saveLogframeId = this.saveLogframeId.bind(this);
    this.saveSpecificObjective = this.saveSpecificObjective.bind(this);
    this.updateSpecificObjectiveErrorMessage = this.updateSpecificObjectiveErrorMessage.bind(
      this
    );

    // results
    // this.saveResults = this.saveResults.bind(this);
    this.onChangeSelectionResultKPIUnitMeasurement = this.onChangeSelectionResultKPIUnitMeasurement.bind(
      this
    );
    this.onAddResults = this.onAddResults.bind(this);
    this.onAddResultsToTable = this.onAddResultsToTable.bind(this);
    this.onCleanResultsForm = this.onCleanResultsForm.bind(this);
    this.onSaveResultsKPIID = this.onSaveResultsKPIID.bind(this);

    this.onToggleButtonProjectName = this.onToggleButtonProjectName.bind(this);

    // loading fn changes
    this.onToggleButtonProjectGeneral = this.onToggleButtonProjectGeneral.bind(
      this
    );
    this.onToggleButtonProjectGeneralDisabled = this.onToggleButtonProjectGeneralDisabled.bind(
      this
    );
    this.onToggleButtonProjectSpecific = this.onToggleButtonProjectSpecific.bind(
      this
    );
    this.onToggleButtonProjectSpecificDisabled = this.onToggleButtonProjectSpecificDisabled.bind(
      this
    );
    // activites
    // this.saveActivities = this.saveActivities.bind(this);
    this.onAddActivities = this.onAddActivities.bind(this);
    this.onAddActivitiesToTable = this.onAddActivitiesToTable.bind(this);
    this.onCleanActivitiesForm = this.onCleanActivitiesForm.bind(this);
    this.onToggleActivitesArea = this.onToggleActivitesArea.bind(this);
    this.onChangeSelectionResources = this.onChangeSelectionResources.bind(
      this
    );
    this.onChangeSelectionHumanResources = this.onChangeSelectionHumanResources.bind(
      this
    );
    this.onChangeSelectionResultsForActivity = this.onChangeSelectionResultsForActivity.bind(
      this
    );
    this.onSelectProjectActivityStartDate = this.onSelectProjectActivityStartDate.bind(
      this
    );
    this.onSelectProjectActivityEndDate = this.onSelectProjectActivityEndDate.bind(
      this
    );
    this.onChangeSelectionResourcesFunction = this.onChangeSelectionResourcesFunction.bind(
      this
    );
    this.onChangeSelectionResourcesUnitMeasurement = this.onChangeSelectionResourcesUnitMeasurement.bind(
      this
    );
    this.onChangeSelectionHumanResourcesUnitMeasurement = this.onChangeSelectionHumanResourcesUnitMeasurement.bind(
      this
    );

    this.onChangeSelectionTypeOfResourceFunction = this.onChangeSelectionTypeOfResourceFunction.bind(
      this
    );
  }

  componentDidMount() {
    moment.locale("es");
    $.ajax({
      type: "GET",
      url: this.props.baseurl + "/ResourceType/GetAll",
      contentType: "application/json",
      dataType: "json",
      success: response => {
        this.setState({
          RESOURCES_OPTIONS: response
        });
      },
      error: response => {}
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSelectInputChange(inputValue, actionMeta) {}

  onSelectProjectGeneralObjectiveKPIDate(project_general_objective_kpi_date) {
    this.setState({
      project_general_objective_kpi_date
    });
  }

  onSelectProjectSpecificObjectiveKPIDate(project_specific_objective_kpi_date) {
    this.setState({
      project_specific_objective_kpi_date
    });
  }

  onSelectProjectResultKPIDate(project_result_kpi_date) {
    this.setState({
      project_result_kpi_date
    });
  }

  onSelectProjectActivityStartDate(project_activity_start_date) {
    this.setState({
      project_activity_start_date
    });
  }

  onSelectProjectActivityEndDate(project_activity_end_date) {
    this.setState({
      project_activity_end_date
    });
  }

  onChangeSelectionResourcesFunction(project_human_resources_function) {
    this.setState({
      project_human_resources_function
    });
  }

  onSelectProjectStartDate(project_start_date) {
    this.setState({
      project_start_date
    });
  }

  onSelectProjectEndDate(project_end_date) {
    this.setState({
      project_end_date
    });
  }

  onChangeSelectionTypeOfResourceFunction(project_type_of_resource) {
    this.setState({
      project_type_of_resource,
      showResourceType: project_type_of_resource.label
    });
  }

  onSubmitProjectName(e) {
    e.preventDefault();

    this.onToggleButtonProjectName();

    const data = JSON.stringify({
      ProjectName: this.state.project_name
    });

    $.ajax({
      type: "POST",
      url: this.props.baseurl + "/ProjectMatrix/Add",
      contentType: "application/json",
      dataType: "json",
      data: data,
      success: response => {
        if (response.status === "success") {
          this.saveLogframeId(response.id);
        } else {
        }
      },
      error: response => {},
      complete: () => {
        this.onToggleButtonProjectName();
      }
    });
  }

  onSubmitGeneralObjective(e) {
    e.preventDefault();

    this.onToggleButtonProjectGeneral();

    const data = JSON.stringify({
      ObjectiveDescription: this.state.project_general_objective,
      ObjetiveIndicator: this.state.project_general_objective_kpi,
      MeansOfVerification: this.state
        .project_general_objective_means_of_verification,
      ObjectiveType: "0"
    });

    $.ajax({
      type: "POST",
      url: this.props.baseurl + "/ProjectObjective/Add",
      contentType: "application/json",
      dataType: "json",
      data: data,
      success: response => {
        if (response.status === "success") {
          this.saveGeneralObjectiveIndicator(response.id);
        } else {
          this.updateGeneralObjectiveErrorMessage(
            "No se pudo guardar la matriz de marco lógico."
          );
        }
      },
      error: response => {
        this.updateGeneralObjectiveErrorMessage(
          "Un error en el servidor nos impidió guardar el objetivo general. Contacte a GTI."
        );
      }
    });
  }

  onToggleLogframe(e) {
    e.preventDefault();
    this.setState({
      showLogframe: !this.state.showLogframe
    });
  }

  onToggleCalendar(e) {
    e.preventDefault();
    this.setState({
      showCalendar: !this.state.showCalendar
    });
  }

  onToggleSpecificObjectiveArea() {
    this.setState({
      showSpecificObjectiveArea: !this.state.showSpecificObjectiveArea
    });
  }

  onToggleResultsArea(b) {
    this.setState({
      showResourcesByActivitiesArea:
        b || !this.state.showResourcesByActivitiesArea
    });
  }

  onChangeSelection(e) {
    this.setState({
      project_general_objective_kpi_unit_measurement: e
    });
  }

  onChangeSelectionResultsForActivity(project_activity_result) {
    this.setState({
      project_activity_result
    });
  }

  onChangeSelectionHumanResourcesUnitMeasurement(e) {
    this.setState({
      project_human_resources_unit_of_measurement: e
    });
  }

  onChangeSelectionResourcesUnitMeasurement(e) {
    this.setState({
      project_resources_unit_of_measurement: e
    });
  }

  onChangeSelectionResultKPIUnitMeasurement(e) {
    this.setState({
      project_result_kpi_unit_measurement: e
    });
  }

  onChangeSelectionResources(e) {
    this.setState({
      project_resources: e
    });
  }

  onChangeSelectionHumanResources(e) {
    this.setState({
      project_human_resources: e
    });
  }

  onChangeSpecificObjectiveSelection(e) {
    this.setState({
      project_specific_objective_kpi_unit_measurement: e
    });
  }

  saveLogframeId(id) {
    this.setState({
      project_logframe_id: id
    });
    window.sessionStorage.setItem("project_logframe_id", id);
  }

  saveGeneralObjectiveIndicator(project_general_objective_id) {
    this.setState({
      project_general_objective_id: project_general_objective_id
    });

    const data = JSON.stringify({
      ProjectObjectiveId: this.state.project_general_objective_id + "",
      Goal: this.state.project_general_objective_kpi_quantity,
      Variable: this.state.project_general_objective_kpi_variable,
      IndicatorUnitOfMeasure: this.state
        .project_general_objective_kpi_unit_measurement.value,
      GoalDate: this.state.project_general_objective_kpi_date,
      ObjectiveAnalysisUnitId: this.state
        .project_general_objective_kpi_unit_measurement.id
    });

    $.ajax({
      type: "POST",
      url: this.props.baseurl + "/ObjectiveIndicator/Add",
      contentType: "application/json",
      dataType: "json",
      data: data,
      success: response => {
        if (response.status === "success") {
          this.onToggleButtonProjectGeneral();
          this.onToggleSpecificObjectiveArea();
        } else {
          this.updateGeneralObjectiveErrorMessage(
            "No se pudo guardar la matriz de marco lógico."
          );
        }
      },
      error: response => {
        this.updateGeneralObjectiveErrorMessage(
          "Un error en el servidor nos impidió guardar el objetivo general. Contacte a GTI."
        );
      }
    });
  }

  saveSpecificObjective(e) {
    e.preventDefault();
    this.onToggleButtonProjectSpecific();
    const data = JSON.stringify({
      ObjectiveDescription: this.state.project_specific_objective,
      ObjetiveIndicator: this.state.project_specific_objective_kpi,
      MeansOfVerification: this.state
        .project_specific_objective_means_of_verification,
      ObjectiveType: "1"
    });

    $.ajax({
      type: "POST",
      url: this.props.baseurl + "/ProjectObjective/Add",
      contentType: "application/json",
      dataType: "json",
      data: data,
      success: response => {
        if (response.status === "success") {
          this.saveSpecificObjectiveIndicator(response.id);
          this.onToggleButtonProjectSpecificDisabled();
        } else {
          this.updateSpecificObjectiveErrorMessage(
            "No se pudo guardar la matriz de marco lógico."
          );
        }
      },
      error: response => {
        this.updateSpecificObjectiveErrorMessage(
          "Un error en el servidor nos impidió guardar el objetivo específico. Contacte a GTI."
        );
      },
      complete: () => {
        this.onToggleButtonProjectSpecific();
      }
    });
  }

  saveSpecificObjectiveIndicator(project_specific_objective_id) {
    this.setState({
      project_specific_objective_id: project_specific_objective_id
    });

    const data = JSON.stringify({
      ProjectObjectiveId: this.state.project_specific_objective_id,
      Goal: this.state.project_specific_objective_kpi_quantity,
      Variable: this.state.project_specific_objective_kpi_variable,
      IndicatorUnitOfMeasure: this.state
        .project_specific_objective_kpi_unit_measurement.value,
      GoalDate: this.state.project_specific_objective_kpi_date,
      ObjectiveAnalysisUnitId: this.state
        .project_specific_objective_kpi_unit_measurement.id
    });

    $.ajax({
      type: "POST",
      url: this.props.baseurl + "/ObjectiveIndicator/Add",
      contentType: "application/json",
      dataType: "json",
      data: data,
      success: response => {
        if (response.status === "success") {
          this.onToggleResultsArea(true);
        } else {
          this.updateGeneralObjectiveErrorMessage(
            "No se pudo guardar el objetivo específico."
          );
        }
      },
      error: response => {
        this.updateGeneralObjectiveErrorMessage(
          "Un error en el servidor nos impidió guardar el objetivo general. Contacte a GTI."
        );
      }
    });
  }

  updateGeneralObjectiveErrorMessage(msg) {
    this.setState({
      project_general_objective_error_message: msg
    });
  }

  updateSpecificObjectiveErrorMessage(msg) {
    this.setState({
      project_specific_objective_error_message: msg
    });
  }

  // Results
  onAddResults(e) {
    e.preventDefault();
    const data = JSON.stringify({
      OutputDescription: this.state.project_result,
      OutputIndicator: this.state.project_result_kpi,
      MeansOfVerification: this.state.project_result_means_of_verification,
      Assumption: this.state.project_result_risks
    });

    $.ajax({
      type: "POST",
      url: this.props.baseurl + "/ProjectOutput/Add",
      contentType: "application/json",
      dataType: "json",
      data: data,
      success: response => {
        if (response.status === "success") {
          this.onToggleActivitesArea(true);
          this.onSaveResultsKPIID(response.id);
          this.onAddResultsToTable();
          this.onCleanResultsForm();
        } else {
        }
      },
      error: response => {
        this.updateGeneralObjectiveErrorMessage(
          "Un error en el servidor nos impidió guardar el objetivo general. Contacte a GTI."
        );
      }
    });
  }

  onSaveResultsKPIID(id) {
    this.setState({
      project_result_kpi_id: id
    });
    const data = JSON.stringify({
      ProjectOutputId: id,
      ProjectMatrixId: this.state.project_logframe_id
    });

    $.ajax({
      type: "POST",
      url: this.props.baseurl + "/MatrixOutput/Add",
      contentType: "application/json",
      dataType: "json",
      data: data,
      success: response => {
        if (response.status === "success") {
        } else {
        }
      },
      error: response => {
        this.updateGeneralObjectiveErrorMessage(
          "Un error en el servidor nos impidió guardar el objetivo general. Contacte a GTI."
        );
      }
    });
  }

  onAddResultsToTable() {
    this.setState({
      project_results: [
        ...this.state.project_results,
        {
          id: this.state.project_results.length,
          result: this.state.project_result,
          kpi: this.state.project_result_kpi,
          kpi_quantity: this.state.project_result_kpi_quantity,
          kpi_variable: this.state.project_result_kpi_variable,
          kpi_date: this.state.project_result_kpi_date,
          means_of_verification: this.state
            .project_result_means_of_verification,
          risks: this.state.project_result_risks
        }
      ],
      project_results_for_activities: [
        ...this.state.project_results_for_activities,
        {
          id: this.state.project_results.length + 1,
          label: this.state.project_result,
          value: this.state.project_result
        }
      ],
      showActivitiesArea: true
    });
  }

  onCleanResultsForm() {
    this.setState({
      project_result: "",
      project_result_kpi: "",
      project_result_kpi_quantity: "",
      project_result_kpi_date: moment(),
      project_result_means_of_verification: "",
      project_result_risks: ""
    });
  }

  onToggleButtonProjectName() {
    this.setState({
      loading_project_name: !this.state.loading_project_name
    });
  }

  onToggleButtonProjectGeneral() {
    this.setState({
      loading_project_general_objective: !this.state
        .loading_project_general_objective
    });
  }

  onToggleButtonProjectGeneralDisabled() {
    this.setState({
      disabled_project_general_objective: !this.state
        .disabled_project_general_objective
    });
  }

  onToggleButtonProjectSpecific() {
    this.setState({
      loading_project_specific_objective: !this.state
        .loading_project_specific_objective
    });
  }

  onToggleButtonProjectSpecificDisabled() {
    this.setState({
      disabled_project_specific_objective: !this.state
        .disabled_project_specific_objective
    });
  }

  // Activities
  onToggleActivitesArea(value) {
    this.setState({
      showActivitiesArea: value
    });
  }

  onAddActivities(e) {
    e.preventDefault();
    this.onAddActivitiesToTable();
    const data = JSON.stringify({
      ActivityDescription: this.state.project_activity_name,
      ProjectOutputId: this.state.project_results_for_activities.id,
      ActivityStatus: "0"
    });

    $.ajax({
      type: "POST",
      url: this.props.baseurl + "/ProjectActivity/Add",
      contentType: "application/json",
      dataType: "json",
      data: data,
      success: response => {
        if (response.status === "success") {
          this.onToggleResultsArea(true);
        } else {
        }
      },
      error: response => {
        this.updateSpecificObjectiveErrorMessage(
          "Un error en el servidor nos impidió guardar el objetivo general. Contacte a GTI."
        );
      }
    });
  }

  onAddActivitiesToTable() {
    this.setState({
      project_activities: [
        ...this.state.project_activities,
        {
          id: this.state.project_activities.length,
          result: this.state.project_results_for_activities.value,
          activity: this.state.project_activity_name,
          start_date: this.state.project_activity_start_date,
          end_date: this.state.project_activity_end_date
        },
        ...this.state.project_activity_type_of_resource_options,
        {
          id: this.state.project_activity_type_of_resource_options.length,
          value: this.state.project_activity_name,
          label: this.state.project_activity_name
        }
      ],
      showActivitiesArea: true
    });
    this.onCleanActivitiesForm();
  }

  onAddResultsKPI() {
    const data = JSON.stringify({
      ProjecObjectiveId: this.state.project_general_objective_id,
      Goal: this.state.project_result_kpi_quantity,
      Variable: this.state.project_result_kpi_variable,
      GoalDate: this.state.project_result_kpi_date
    });

    $.ajax({
      type: "POST",
      url: this.props.baseurl + "/OutputIndicator/Add",
      contentType: "application/json",
      dataType: "json",
      data: data,
      success: response => {
        if (response.status === "success") {
          this.onCleanResultsForm();
        } else {
        }
      },
      error: response => {
        this.updateGeneralObjectiveErrorMessage(
          "Un error en el servidor nos impidió guardar el objetivo general. Contacte a GTI."
        );
      }
    });
    this.setState({
      project_activities: [
        ...this.state.project_activities,
        {
          id: this.state.project_activities.length,
          result: this.state.project_results_for_activities.value,
          activity: this.state.project_activity_name,
          start_date: this.state.project_activity_start_date,
          end_date: this.state.project_activity_end_date,
          resource: this.state.project_resources.value,
          resources_quantity: this.state.project_resources_quantity,
          unit_of_measurement: this.state.project_resources_unit_of_measurement
            .value,
          unit_price: this.state.project_resources_unit_price,
          entity: this.state.project_resources_entity,
          total:
            parseInt(this.state.project_resources_unit_price, 10) *
            parseInt(this.state.project_resources_quantity, 10)
        }
      ],
      showActivitiesArea: true
    });
    this.onCleanActivitiesForm();
  }

  onCleanActivitiesForm() {
    this.setState({
      project_activity_name: "",
      project_activity_start_date: moment(),
      project_activity_end_date: moment()
    });
  }

  render() {
    const results_table = this.state.project_results.length ? (
      this.state.project_results.map(result => {
        const result_target_date = result.kpi_date;
        return (
          <tr key={result.id}>
            <td>
              <strong>R.{result.id + 1}</strong> {result.result}
              <br />
              <strong>KPI:</strong> {result.kpi}
            </td>
            <td>{moment(result_target_date).format("LL")}</td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan={2}>
          <div>
            <h3 className="text-center">
              Agregue un resultado en el formulario de arriba{" "}
              <span role="img" aria-label="up emoji">
                ⬆️
              </span>
            </h3>
          </div>
        </td>
      </tr>
    );
    const resources_table = this.state.project_resources_table.length ? (
      this.state.project_resources_table.map(resource => {
        return (
          <tr key={resource.id}>
            <td>{resource.resource}</td>
            <td>
              {resource.resources_quantity} {resource.unit_of_measurement}
            </td>
            <td>
              {resource.total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
              })}
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan={2}>
          <div>
            <h3 className="text-center">
              Agregue un recurso en el formulario de arriba{" "}
              <span role="img" aria-label="up emoji">
                ⬆️
              </span>
            </h3>
          </div>
        </td>
      </tr>
    );
    const activities_table = this.state.project_activities.length ? (
      this.state.project_activities.map(activity => {
        return (
          <tr key={activity.id}>
            <td>{activity.result}</td>
            <td>{activity.activity}</td>
            <td>
              Inicia: {moment(activity.start_date).format("LL")} <br />
              Finaliza: {moment(activity.end_date).format("LL")}
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan={2}>
          <div>
            <h3 className="text-center">
              Agregue una actividad en el formulario de arriba{" "}
              <span role="img" aria-label="up emoji">
                ⬆️
              </span>
            </h3>
          </div>
        </td>
      </tr>
    );
    return (
      /*Componente que se ejecutara cuando no encuentre un comonente al cual redireccionar*/
      <div className="content-inner no-padding-top no-padding-left no-padding-right">
        <div className="toggle-budget-wrapper">
          <Button color="link" onClick={this.onToggleLogframe}>
            <i className="md-icon">attach_money</i>
          </Button>
        </div>
        <div className="toggle-logframe-wrapper">
          <Button color="link" onClick={this.onToggleLogframe}>
            <i className="md-icon">table_chart</i>
          </Button>
        </div>
        <div className="toggle-calendar-wrapper">
          <Button color="link" onClick={this.onToggleCalendar}>
            <i className="md-icon">calendar_today</i>
          </Button>
        </div>
        <div className="text-center">
          <h1>Información General</h1>
          <Form onSubmit={this.onSubmitProjectName}>
            <FormGroup row className="align-items-center">
              <Col sm={7}>
                <Input
                  required
                  type="text"
                  name="project_name"
                  id="project_name"
                  placeholder="Nombre del Proyecto"
                  value={this.state.project_name}
                  onChange={this.onChange}
                />
              </Col>
              <Col sm={4}>
                <LaddaButton
                  loading={this.state.loading_project_name}
                  className="d-flex align-items-center ml-auto btn btn-primary"
                >
                  <i className="md-icon">add</i>
                  Crear Proyecto
                </LaddaButton>
              </Col>
            </FormGroup>
          </Form>
        </div>
        <div className="border-bottom side-margins box">
          <h1>Objetivo General</h1>
          <Form onSubmit={this.onSubmitGeneralObjective}>
            <FormGroup row className="align-items-center">
              <Label for="project_general_objective" sm={2}>
                Objetivo General
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_general_objective"
                  id="project_general_objective"
                  placeholder="Objetivo General"
                  value={this.state.project_general_objective}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_general_objective_kpi" sm={2}>
                Indicador Objetivo General
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_general_objective_kpi"
                  id="project_general_objective_kpi"
                  placeholder="Indicador del Objetivo General"
                  value={this.state.project_general_objective_kpi}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label className="muted" sm={2}>
                Información Granular del Indicador del Objetivo General
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="give-me-space-between"
                  type="text"
                  name="project_general_objective_kpi_quantity"
                  id="project_general_objective_kpi_quantity"
                  placeholder="Valor del Indicador"
                  value={this.state.project_general_objective_kpi_quantity}
                  onChange={this.onChange}
                />
                <CreatableSelect
                  required
                  isClearable
                  className="give-me-space-between"
                  name="project_general_objective_kpi_unit_measurement"
                  value={
                    this.state.project_general_objective_kpi_unit_measurement
                  }
                  onChange={this.onChangeSelection}
                  onInputChange={this.onSelectInputChange}
                  options={UNIT_MEASUREMENT_OBJECTIVE}
                />
                <Input
                  required
                  className="give-me-space-between"
                  type="text"
                  name="project_general_objective_kpi_variable"
                  id="project_general_objective_kpi_variable"
                  placeholder="Variable"
                  value={this.state.project_general_objective_kpi_variable}
                  onChange={this.onChange}
                />
                <DatetimePickerTrigger
                  closeOnSelectDay={true}
                  moment={this.state.project_general_objective_kpi_date}
                  onChange={this.onSelectProjectGeneralObjectiveKPIDate}
                  className="give-me-space-between"
                >
                  <input
                    type="text"
                    value={this.state.project_general_objective_kpi_date.format(
                      "LL"
                    )}
                    readOnly
                  />
                </DatetimePickerTrigger>
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label
                for="project_general_objective_means_of_verification"
                sm={2}
              >
                Medio de Verificación del Objetivo General
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_general_objective_means_of_verification"
                  id="project_general_objective_means_of_verification"
                  placeholder="Medios de Verificación del Objetivo General"
                  value={
                    this.state.project_general_objective_means_of_verification
                  }
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_general_objective_risks" sm={2}>
                Supuesto del Objetivo General
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_general_objective_risks"
                  id="project_general_objective_risks"
                  placeholder="Supuesto del Objetivo General"
                  value={this.state.project_general_objective_risks}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 11 }}>
                <span className="color-danger">
                  {this.state.project_general_objective_error_message}
                </span>
                <LaddaButton
                  loading={this.state.loading_project_general_objective}
                  className="d-flex align-items-center ml-auto btn btn-primary"
                  disabled={this.state.disabled_project_general_objective}
                >
                  <i className="md-icon">add</i>
                  Agregar Objetivo General
                </LaddaButton>
              </Col>
            </FormGroup>
          </Form>
          <h1>Objetivos Específicos</h1>
          <Form
            onSubmit={this.saveSpecificObjective}
            className={`${
              this.state.showSpecificObjectiveArea
                ? ""
                : "opacity-5 p-events-none"
            }`}
          >
            <FormGroup row className="align-items-center">
              <Label for="project_specific_objective" sm={2}>
                Objetivo Específico
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_specific_objective"
                  id="project_specific_objective"
                  placeholder="Objetivo Específico"
                  value={this.state.project_specific_objective}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_specific_objective_kpi" sm={2}>
                Indicador Objetivo Específico
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_specific_objective_kpi"
                  id="project_specific_objective_kpi"
                  placeholder="Indicador del Objetivo Específico"
                  value={this.state.project_specific_objective_kpi}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label className="muted" sm={2}>
                Información Granular del Indicador del Objetivo Específico
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="give-me-space-between"
                  type="text"
                  name="project_specific_objective_kpi_quantity"
                  id="project_specific_objective_kpi_quantity"
                  placeholder="Valor del Indicador"
                  value={this.state.project_specific_objective_kpi_quantity}
                  onChange={this.onChange}
                />
                <CreatableSelect
                  required
                  isClearable
                  className="give-me-space-between"
                  name="project_specific_objective_kpi_unit_measurement"
                  value={
                    this.state.project_specific_objective_kpi_unit_measurement
                  }
                  onChange={this.onChangeSpecificObjectiveSelection}
                  onInputChange={this.onSelectInputChange}
                  options={UNIT_MEASUREMENT_OBJECTIVE}
                />
                <Input
                  required
                  className="give-me-space-between"
                  type="text"
                  name="project_specific_objective_kpi_variable"
                  id="project_specific_objective_kpi_variable"
                  placeholder="Variable"
                  value={this.state.project_specific_objective_kpi_variable}
                  onChange={this.onChange}
                />
                <DatetimePickerTrigger
                  closeOnSelectDay={true}
                  moment={this.state.project_specific_objective_kpi_date}
                  onChange={this.onSelectProjectSpecificObjectiveKPIDate}
                  className="give-me-space-between"
                >
                  <input
                    type="text"
                    value={this.state.project_specific_objective_kpi_date.format(
                      "LL"
                    )}
                    readOnly
                  />
                </DatetimePickerTrigger>
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label
                for="project_specific_objective_means_of_verification"
                sm={2}
              >
                Medio de Verificación del Objetivo Específico
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_specific_objective_means_of_verification"
                  id="project_specific_objective_means_of_verification"
                  placeholder="Medios de Verificación del Objetivo Específico"
                  value={
                    this.state.project_specific_objective_means_of_verification
                  }
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_specific_objective_risks" sm={2}>
                Supuesto del Objetivo Específico
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_specific_objective_risks"
                  id="project_specific_objective_risks"
                  placeholder="Supuesto del Objetivo Específico"
                  value={this.state.project_especifico_objective_risks}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 11 }}>
                <span className="color-danger">
                  {this.state.project_specific_objective_error_message}
                </span>
                <LaddaButton
                  loading={this.state.loading_project_specific_objective}
                  className="d-flex align-items-center ml-auto btn btn-primary"
                  disabled={this.state.disabled_project_specific_objective}
                >
                  <i className="md-icon">add</i>
                  Agregar Objetivo Específico
                </LaddaButton>
              </Col>
            </FormGroup>
          </Form>
          <h1>Resultados</h1>
          <Form
            onSubmit={this.onAddResults}
            className={`${
              this.state.showResultsArea ? "" : "opacity-5 p-events-none"
            }`}
          >
            <FormGroup row className="align-items-center">
              <Label for="project_result" sm={2}>
                Resultado
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_result"
                  id="project_result"
                  placeholder="Resultado"
                  value={this.state.project_result}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_result_kpi" sm={2}>
                Indicador Resultado
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_result_kpi"
                  id="project_result_kpi"
                  placeholder="Indicador del Resultado"
                  value={this.state.project_result_kpi}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label className="muted" sm={2}>
                Información Granular del Indicador del Resultado
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="give-me-space-between"
                  type="text"
                  name="project_result_kpi_quantity"
                  id="project_result_kpi_quantity"
                  placeholder="Valor del Indicador"
                  value={this.state.project_result_kpi_quantity}
                  onChange={this.onChange}
                />
                <CreatableSelect
                  required
                  isClearable
                  className="give-me-space-between"
                  name="form-field-name"
                  value={this.state.project_result_kpi_unit_measurement}
                  onChange={this.onChangeSelection}
                  onInputChange={this.onSelectInputChange}
                  options={UNIT_MEASUREMENT_RESULTS}
                />
                <Input
                  required
                  className="give-me-space-between"
                  type="text"
                  name="project_result_kpi_variable"
                  id="project_result_kpi_variable"
                  placeholder="Variable"
                  value={this.state.project_result_kpi_variable}
                  onChange={this.onChange}
                />
                <DatetimePickerTrigger
                  closeOnSelectDay={true}
                  moment={this.state.project_result_kpi_date}
                  onChange={this.onSelectProjectResultKPIDate}
                  className="give-me-space-between"
                >
                  <input
                    type="text"
                    value={this.state.project_result_kpi_date.format("LL")}
                    readOnly
                  />
                </DatetimePickerTrigger>
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_result_means_of_verification" sm={2}>
                Medio de Verificación del Resultado
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_result_means_of_verification"
                  id="project_result_means_of_verification"
                  placeholder="Medios de Verificación del Resultado"
                  value={this.state.project_result_means_of_verification}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_result_risks" sm={2}>
                Supuesto del Resultado
              </Label>
              <Col sm={9}>
                <Input
                  required
                  className="height-100px"
                  type="textarea"
                  name="project_result_risks"
                  id="project_result_risks"
                  placeholder="Supuesto del Resultado"
                  value={this.state.project_result_risks}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 11 }}>
                <Button
                  color="primary"
                  className="d-flex align-items-center ml-auto"
                >
                  <i className="md-icon">add</i>
                  Agregar Resultado
                </Button>
              </Col>
            </FormGroup>
          </Form>
          <hr />
          <div className="table-responsive">
            <table>
              <thead>
                <tr className="no-cursorpointer">
                  <th> Resultado </th>
                  <th> Fecha Meta </th>
                </tr>
              </thead>
              <tbody>{results_table}</tbody>
            </table>
          </div>
          <h1>Actividades</h1>
          <Form
            onSubmit={this.onAddActivities}
            className={`${
              this.state.showActivitiesArea ? "" : "opacity-5 p-events-none"
            }`}
          >
            <FormGroup row className="align-items-center">
              <Label for="project_activity_result" sm={2}>
                Resultado de la Actividad
              </Label>
              <Col sm={9}>
                <Select
                  id="project_activity_result"
                  name="project_activity_result"
                  options={this.state.project_results_for_activities}
                  value={this.state.project_activity_result}
                  onChange={this.onChangeSelectionResultsForActivity}
                  onInputChange={this.onSelectInputChange}
                  isClearable
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_activity_name" sm={2}>
                Nombre de la Actividad
              </Label>
              <Col sm={9}>
                <Input
                  required
                  type="text"
                  name="project_activity_name"
                  id="project_activity_name"
                  placeholder="Nombre de la actividad"
                  value={this.state.project_activity_name}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_activity_start_date" sm={2}>
                Fecha de Inicio de la Actividad
              </Label>
              <Col sm={9}>
                <DatetimePickerTrigger
                  closeOnSelectDay={true}
                  moment={this.state.project_activity_start_date}
                  onChange={this.onSelectProjectActivityStartDate}
                  className="give-me-space-between"
                >
                  <input
                    type="text"
                    value={this.state.project_activity_start_date.format("LL")}
                    readOnly
                  />
                </DatetimePickerTrigger>
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_activity_end_date" sm={2}>
                Fecha Fin de la Actividad
              </Label>
              <Col sm={9}>
                <DatetimePickerTrigger
                  closeOnSelectDay={true}
                  moment={this.state.project_activity_end_date}
                  onChange={this.onSelectProjectActivityEndDate}
                  className="give-me-space-between"
                >
                  <input
                    type="text"
                    value={this.state.project_activity_end_date.format("LL")}
                    readOnly
                  />
                </DatetimePickerTrigger>
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 11 }}>
                <Button
                  color="primary"
                  className="d-flex align-items-center ml-auto"
                >
                  <i className="md-icon">add</i>
                  Agregar Actividad
                </Button>
              </Col>
            </FormGroup>
          </Form>
          <hr />
          <div className="table-responsive">
            <table>
              <thead>
                <tr className="no-cursorpointer">
                  <th> Resultado </th>
                  <th> Actividad </th>
                  <th> Fechas </th>
                </tr>
              </thead>
              <tbody>{activities_table}</tbody>
            </table>
          </div>
          <Form
            onSubmit={this.onAddResourcesByActivity}
            className={`${
              this.state.showResourcesByActivitiesArea
                ? ""
                : "opacity-5 p-events-none"
            }`}
          >
            <h3>Recursos a utilizarse en la actividad</h3>
            <FormGroup row className="align-items-center">
              <Label for="project_type_of_resource" sm={2}>
                Seleccione el tipo de recurso
              </Label>
              <Col sm={9}>
                <Select
                  name="project_type_of_resource"
                  id="project_type_of_resource"
                  onInputChange={this.onSelectInputChange}
                  onChange={this.onChangeSelectionTypeOfResourceFunction}
                  value={this.state.project_type_of_resource}
                  options={PROJECT_RESOURCE_TYPE}
                  isClearable
                  simpleValue
                  isSearchable
                />
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              <Label for="project_activity_type_of_resource" sm={2}>
                Seleccione actividad
              </Label>
              <Col sm={9}>
                <Select
                  name="project_activity_type_of_resource"
                  id="project_activity_type_of_resource"
                  onInputChange={this.onSelectInputChange}
                  onChange={this.onChangeSelectionTypeOfResourcesFunction}
                  value={this.state.project_activity_type_of_resource}
                  options={this.state.project_activity_type_of_resource_options}
                  isClearable
                  simpleValue
                  isSearchable
                />
              </Col>
            </FormGroup>
            <hr />
            <div
              className={`${
                this.state.showResourceType !== "Otros Recursos"
                  ? "d-block"
                  : "d-none"
              }`}
            >
              <h4>Recursos Humanos</h4>
              <FormGroup row className="align-items-center">
                <Label for="project_human_resources" sm={2}>
                  Seleccione el recurso a utilizarse
                </Label>
                <Col sm={9}>
                  <CreatableSelect
                    required
                    isClearable
                    className="give-me-space-between"
                    name="project_human_resources"
                    id="project_human_resources"
                    value={this.state.project_human_resources}
                    onChange={this.onChangeSelectionHumanResources}
                    onInputChange={this.onSelectInputChange}
                    options={HUMAN_RESOURCES}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="align-items-center">
                <Label for="project_human_resources_name" sm={2}>
                  Nombre del recurso humano
                </Label>
                <Col sm={9}>
                  <Input
                    required
                    type="text"
                    name="project_human_resources_name"
                    id="project_human_resources_name"
                    placeholder="Nombre completo"
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="align-items-center">
                <Label for="project_human_resources_function" sm={2}>
                  Función del recurso humano dentro del proyecto
                </Label>
                <Col sm={9}>
                  <Select
                    name="project_human_resources_function"
                    id="project_human_resources_function"
                    onInputChange={this.onSelectInputChange}
                    onChange={this.onChangeSelectionResourcesFunction}
                    value={this.state.project_human_resources_function}
                    options={HUMAN_RESOURCES_FUNCTION}
                    isClearable
                    simpleValue
                    isMulti
                    isSearchable
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="align-items-center">
                <Label for="project_human_resources_total_hours" sm={2}>
                  Cantidad de Horas
                </Label>
                <Col sm={9}>
                  <Input
                    type="number"
                    name="project_human_resources_total_hours"
                    id="project_human_resources_total_hours"
                    placeholder="Cantidad de Horas"
                    onChange={this.onChange}
                    step="0.5"
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="align-items-center">
                <Label for="project_human_resources_unit_price" sm={2}>
                  Costo por Hora
                </Label>
                <Col sm={9}>
                  <Input
                    type="number"
                    name="project_human_resources_unit_price"
                    id="project_human_resources_unit_price"
                    placeholder="Costo por Hora"
                    onChange={this.onChange}
                    step="0.1"
                  />
                </Col>
              </FormGroup>
            </div>
            <div
              className={`${
                this.state.showResourceType !== "Otros Recursos"
                  ? "d-none"
                  : "d-block"
              }`}
            >
              <h4>Otros Recursos</h4>
              <FormGroup row className="align-items-center">
                <Label for="project_resources" sm={2}>
                  Seleccione el recurso a utilizarse
                </Label>
                <Col sm={9}>
                  <CreatableSelect
                    required
                    isClearable
                    className="give-me-space-between"
                    name="project_resources"
                    id="project_resources"
                    value={this.state.project_resources}
                    onChange={this.onChangeSelectionResources}
                    onInputChange={this.onSelectInputChange}
                    options={RESOURCES}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="align-items-center">
                <Label for="project_resources_quantity" sm={2}>
                  Cantidad
                </Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    name="project_resources_quantity"
                    id="project_resources_quantity"
                    placeholder="Cantidad de Recurso"
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="align-items-center">
                <Label for="project_resources_unit_of_measurement" sm={2}>
                  Unidad de Medida
                </Label>
                <Col sm={9}>
                  <Select
                    name="project_resources_unit_of_measurement"
                    id="project_resources_unit_of_measurement"
                    onInputChange={this.onSelectInputChange}
                    onChange={this.onChangeSelectionResourcesUnitMeasurement}
                    value={this.state.project_resources_unit_of_measurement}
                    options={UNIT_MEASUREMENT}
                    isClearable
                    isSearchable
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="align-items-center">
                <Label for="project_resources_unit_price" sm={2}>
                  Precio Unitario
                </Label>
                <Col sm={9}>
                  <Input
                    type="number"
                    name="project_resources_unit_price"
                    id="project_resources_unit_price"
                    placeholder="Precio Unitario"
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="align-items-center">
                <Label sm={2}>Entidad que proporciona el recurso</Label>
                <Col sm={4}>
                  <div className="pretty p-default p-round">
                    <input
                      type="radio"
                      required
                      id="project_resources_entity_uees"
                      name="project_resources_entity"
                      checked={
                        typeof this.state.project_resources_entity !==
                        "undefined"
                          ? this.state.project_resources_entity === "uees"
                          : false
                      }
                      value="uees"
                      onChange={this.onChange}
                    />
                    <div className="state">
                      <label>Universidad Evangélica (UEES)</label>
                    </div>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="pretty p-default p-round">
                    <input
                      type="radio"
                      required
                      id="project_resources_entity_other_one"
                      name="project_resources_entity"
                      checked={
                        typeof this.state.project_resources_entity !==
                        "undefined"
                          ? this.state.project_resources_entity === "other"
                          : false
                      }
                      value="other"
                      onChange={this.onChange}
                    />
                    <div className="state">
                      <label>Institución Contraparte</label>
                    </div>
                  </div>
                </Col>
              </FormGroup>
            </div>
            <FormGroup check row>
              <Col sm={{ size: 11 }}>
                <Button
                  color="primary"
                  className="d-flex align-items-center ml-auto"
                >
                  <i className="md-icon">add</i>
                  Agregar Recurso
                </Button>
              </Col>
            </FormGroup>
            {/* <hr />
            Costo Total:{" "}
            {parseInt(this.state.total, 10).toLocaleString("en-US", {
              style: "currency",
              currency: "USD"
            })}
            <hr /> */}
          </Form>
          <hr />
          <div className="table-responsive">
            <table>
              <thead>
                <tr className="no-cursorpointer">
                  <th> Actividad </th>
                  <th> Recurso </th>
                  <th> Costo por Actividad </th>
                </tr>
              </thead>
              <tbody>{resources_table}</tbody>
            </table>
          </div>
        </div>
        <div
          className={`bg-logframe ${
            this.state.showCalendar ? "di-flex" : "d-none"
          } justify-content-center align-items-center`}
        >
          <div className="bg-bright p-25 br-5 max-height-90vh o-auto">
            <div className="text-right">
              <Button color="link" onClick={this.onToggleCalendar}>
                [ Ocultar Calendario ]
              </Button>
            </div>
            <h3 className="text-center">Calendario</h3>
            <table>
              <thead>
                <tr>
                  <th>Resultado</th>
                  <th>Actividad</th>
                  <th>Fechas</th>
                </tr>
              </thead>
              <tbody>{activities_table}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stado: 0,
      store_uuid: null,
      title: "Nuevo Proyecto - Matriz Marco Lógico",
      page: "logframe",
      menu: "project-new"
    };
    this.set_project_view = this.set_project_view.bind(this);
  }

  componentDidMount() {
    this.set_project_view();
  }

  set_project_view() {
    const scope = this.props.scope;

    switch (scope) {
      case "user":
        return <NewProjectUser {...this.props} />;
      case "admin":
        return <NewProjectAdmin {...this.props} />;
      case "moderador":
        return <NewProjectAdmin {...this.props} />;
      default:
        break;
    }
  }

  render() {
    return (
      <Backend
        title={this.state.title}
        page={this.state.page}
        menu={this.state.menu}
      >
        <div className="content">{this.set_project_view()}</div>
      </Backend>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    authorize: state.mainReducer.auth.authorize,
    userToken: state.mainReducer.auth.token,
    scope: state.mainReducer.auth.scope,
    email: state.mainReducer.auth.email,
    id: state.mainReducer.auth.id,
    register: state.mainReducer.auth.register,
    type: state.mainReducer.auth.type,
    infouser: state.mainReducer.auth.infouser,
    info_cuenta: state.mainReducer.auth.info_cuenta,
    baseurl: state.mainReducer.setBaseUrl.baseurl
  };
};

export default withRouter(connect(mapStateToProps)(NewProject));
