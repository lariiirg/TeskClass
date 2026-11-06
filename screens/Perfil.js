
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

export default function Perfil() {
  const { width } = useWindowDimensions();
  const desktop = width >= 900;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.conteudo,
        desktop && styles.conteudoDesktop,
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.titulo}>Meu perfil</Text>
      <Text style={styles.subtitulo}>
        Gerencie suas informações e acompanhe seu progresso
      </Text>

      <View style={[styles.colunas, desktop && styles.colunasDesktop]}>
        <View style={styles.coluna}>
          <View style={styles.perfilCard}>
            <View style={styles.avatarBorda}>
              <View style={styles.avatar}>
                <Text style={styles.letra}>A</Text>
              </View>
            </View>

            <Text style={styles.nome}>Aluno Deadline</Text>
            <Text style={styles.email}>aluno@taskclass.com</Text>

            <View style={styles.selo}>
              <Text style={styles.seloTexto}>◈  Estudante</Text>
            </View>
          </View>

          <View style={styles.informacoes}>
            <Text style={styles.secaoTitulo}>Informações da conta</Text>

            <View style={styles.linhaInfo}>
              <View style={styles.infoIcone}>
                <Text style={styles.infoIconeTexto}>◈</Text>
              </View>
              <View>
                <Text style={styles.label}>TIPO DE USUÁRIO</Text>
                <Text style={styles.valor}>Membro</Text>
              </View>
            </View>

            <View style={styles.divisor} />

            <View style={styles.linhaInfo}>
              <View style={styles.infoIcone}>
                <Text style={styles.infoIconeTexto}>▤</Text>
              </View>
              <View>
                <Text style={styles.label}>TRABALHOS ATIVOS</Text>
                <Text style={styles.valor}>2 trabalhos</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.coluna}>
          <Text style={styles.secaoTitulo}>Meu desempenho</Text>

          <View style={styles.estatisticas}>
            <View style={styles.estatistica}>
              <View style={styles.iconeVerde}>
                <Text style={styles.verde}>✓</Text>
              </View>
              <Text style={styles.numero}>0</Text>
              <Text style={styles.estatisticaTexto}>
                Trabalhos concluídos
              </Text>
            </View>

            <View style={styles.estatistica}>
              <View style={styles.iconeVermelho}>
                <Text style={styles.vermelho}>▤</Text>
              </View>
              <Text style={styles.numero}>2</Text>
              <Text style={styles.estatisticaTexto}>
                Trabalhos ativos
              </Text>
            </View>
          </View>

          <View style={styles.avisoCard}>
            <Text style={styles.avisoTitulo}>
              Informações do estudante
            </Text>

            <Text style={styles.avisoTexto}>
              As informações de usuário serão integradas ao
              cadastro e login nas próximas etapas do projeto.
            </Text>
          </View>

          <Text style={styles.versao}>
            Deadline · Protótipo visual
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  conteudo: {
    width: '100%',
    padding: 20,
    paddingBottom: 40,
  },
  conteudoDesktop: {
    maxWidth: 1300,
    alignSelf: 'center',
    paddingHorizontal: 40,
    paddingTop: 30,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  subtitulo: {
    color: '#6B7280',
    fontSize: 13,
    marginTop: 6,
    marginBottom: 27,
  },
  colunas: {
    gap: 20,
  },
  colunasDesktop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  coluna: {
    flex: 1,
    minWidth: 0,
  },
  perfilCard: {
    backgroundColor: '#FFF7F7',
    borderRadius: 25,
    padding: 30,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    alignItems: 'center',
  },
  avatarBorda: {
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 55,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letra: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
  },
  nome: {
    color: '#111827',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 17,
  },
  email: {
    color: '#6B7280',
    fontSize: 13,
    marginTop: 6,
  },
  selo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 9,
    marginTop: 16,
  },
  seloTexto: {
    color: '#B91C1C',
    fontSize: 12,
    fontWeight: 'bold',
  },
  informacoes: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    marginTop: 17,
  },
  secaoTitulo: {
    color: '#111827',
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 17,
  },
  linhaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  infoIcone: {
    width: 42,
    height: 42,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },
  infoIconeTexto: {
    color: '#DC2626',
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  valor: {
    color: '#111827',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  divisor: {
    height: 1,
    backgroundColor: '#F1F2F4',
    marginVertical: 15,
  },
  estatisticas: {
    flexDirection: 'row',
    gap: 13,
  },
  estatistica: {
    flex: 1,
    minWidth: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    padding: 19,
  },
  iconeVerde: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconeVermelho: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verde: {
    color: '#059669',
    fontSize: 22,
    fontWeight: 'bold',
  },
  vermelho: {
    color: '#DC2626',
    fontSize: 22,
    fontWeight: 'bold',
  },
  numero: {
    color: '#111827',
    fontSize: 29,
    fontWeight: '800',
    marginTop: 14,
  },
  estatisticaTexto: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 6,
  },
  avisoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    marginTop: 17,
  },
  avisoTitulo: {
    color: '#111827',
    fontSize: 15,
    fontWeight: 'bold',
  },
  avisoTexto: {
    color: '#6B7280',
    fontSize: 13,
    lineHeight: 22,
    marginTop: 9,
  },
  versao: {
    color: '#9CA3AF',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 25,
  },
});
